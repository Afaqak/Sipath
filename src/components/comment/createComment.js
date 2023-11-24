'use client';
import React, { useRef, useState, useMemo, useEffect } from 'react';
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
import { LoadingSkeletons } from '..';
import { Skeleton } from '../ui/skeleton';
import { LoadingQuillSkeleton } from '@/utils/skeletons';

export const CreateComment = ({ reply, setText, setFile, handleSubmit }) => {
  const { data: user } = useSession();
  const quillRef = useRef();
  const [showQuill, setShowQuill] = useState(false);

  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     setShowQuill(true);
  //   }, 2000); 

  //   return () => clearTimeout(delay);
  // }, []);

  const handleChange = (editor) => {
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
          editor.insertEmbed(range.index, 'image', imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 relative pb-4 min-h-[10rem] max-h-[20rem]">
      {/* {!showQuill ? <LoadingQuillSkeleton /> : null} */}
      <UserAvatar
        user={{
          image: user?.user?.profile_image,
          name: user?.user?.first_name || user?.user?.display_name || user?.email,
        }}
        className="h-10 w-10 self-start"
      />
      {/* {showQuill && ( */}
        <div className="w-full md:px-2 flex items-center rounded-sm py-1 shadow-inner bg-gray-100">
          <QuillNoSSRWrapper
            forwardedRef={quillRef}
            onChange={handleChange}
            modules={modules}
            className="w-full"
          />
        </div>
      {/* )} */}
      {!reply && (
        <button type="submit">
          <Icons.comment />
        </button>
      )}
    </form>
  );
};
