'use client';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import UserAvatar from '../common/userAvatar';
import dynamic from 'next/dynamic';
import { warningToastNoAction } from '@/utils/toasts';
const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);
import 'react-quill/dist/quill.snow.css';
import { Icons } from '../icons';
import { useSession } from 'next-auth/react';

export const CreateComment = ({ reply, handleSubmit }) => {
  const { data: user } = useSession();
  const quillRef = useRef();
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [showQuill, setShowQuill] = useState(false);



  const handleChange = (editor) => {
    const images = new DOMParser().parseFromString(editor, 'text/html').querySelectorAll('img');
    console.log(images.length)
    if (images.length === 0) {
      setFile(0)
    }
    setText(editor);

  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image', 'code-block'],
        ],
        handlers: {
          image: selectLocalImage,
        },
      },
    }),
    []
  );
  function selectLocalImage() {
    const editor = quillRef.current.getEditor();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];

      if (file) {
        setFile(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          const range = editor.getSelection();

          editor.clipboard.dangerouslyPasteHTML(range.index, `<img src="${imageUrl}" alt="Inserted Image" />`);

          const imageNode = editor?.getLeaf(range.index)[0].domNode;

          const width = 100;
          const height = 100;

          editor.formatText(range.index, 1, { width, height }, 'user');
        };
        reader.readAsDataURL(file);
      }
    };
  }


  const onConfirmSubmit = (e) => {
    e.preventDefault()
    if (text === '<p><br></p>') {
      return
    }


    if (!file && !text) {
      return warningToastNoAction("You must specify either text or image to comment!");
    }
    handleSubmit(file, text, () => {
      const editor = quillRef.current.getEditor();
      editor.setText('');
      setText('')
      setFile(null)
    })
  }

  return (
    <form onSubmit={onConfirmSubmit} className="flex flex-col md:flex-row gap-4 relative">
      <UserAvatar
        user={{
          image: user?.user?.profile_image,
          name: user?.user && (
            user?.user?.first_name?.slice(0, 2) ||
            user?.user?.display_name?.slice(0, 2) ||
            user?.email?.slice(0,2)
          ),
        }}
        className="h-10 w-10 self-start"
      />

      <div className="w-full md:px-2 ">
        <QuillNoSSRWrapper
          forwardedRef={quillRef}
          onChange={handleChange}
          modules={modules}
          className="w-full"
        />
      </div>

      <button type="submit">
        <Icons.comment />
      </button>

    </form>
  );
};