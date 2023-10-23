'use client';
import React, { useRef, useState, useMemo } from 'react';
import UserAvatar from '../common/userAvatar';
import dynamic from 'next/dynamic';
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

export const CreateComment = ({ reply, setText, setFile, handleSubmit }) => {
  const { data: user } = useSession();
  const quillRef = useRef();
  const handleChange = (editor) => {
    setText(editor);
    console.log(editor);
  };

  const quillImageCallback = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      console.log(file);
    };
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
    console.log('custom image handler');
    const editor = quillRef.current.getEditor();

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      console.log(file, 'from quil');
      if (file) {
        setFile(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;

          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <UserAvatar
        user={{
          image: user?.user?.profile_image,
          name: user?.user?.first_name || user?.user?.display_name || user?.email,
        }}
        className="h-8 w-8 self-start"
      />
      <div className="flex-1 flex relative items-center w-full md:px-2 rounded-sm py-1 shadow-inner  bg-gray-100">
        <QuillNoSSRWrapper
          forwardedRef={quillRef}
          onChange={handleChange}
          modules={modules}
          className="w-full"
        />
      </div>
      {!reply && (
        <button type="submit">
          <Icons.comment />
        </button>
      )}
    </form>
  );
};
