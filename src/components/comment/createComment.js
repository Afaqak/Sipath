'use client';
import React, { useRef, useState, useEffect } from 'react';
import UserAvatar from '../common/userAvatar';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Icons } from '../icons';
import { useSession } from 'next-auth/react';
// import katex from 'katex';
import 'katex/dist/katex.min.css';
// window.katex = katex;

export const CreateComment = ({ reply, commentRef, setFile, handleSubmit }) => {
  const { data: user } = useSession();

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'formula',
    'bullet',
    'indent',
    'link',
    'image',
    'imageBlot',
    'code-block',
  ];

  useEffect(() => {
    commentRef.current
      .getEditor()
      .getModule('toolbar')
      .addHandler('image', () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
          if (!input.files || !input?.files?.length || !input?.files?.[0]) return;
          const editor = commentRef?.current?.getEditor();
          const file = input.files[0];
          setFile(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target.result;
            editor.insertEmbed(editor.getSelection(true).index, 'image', imageUrl);
          };
          reader.readAsDataURL(file);
        };
      });
  }, [commentRef]);

  const handleChange = () => {
    const editor = commentRef.current.value;
    const imgRegex = /<img[^>]*>/g;
    const textWithoutImages = editor.replace(imgRegex, '');
    console.log(textWithoutImages);
    // commentRef.current.value = textWithoutImages;
  };

  const modules = {
    toolbar: [['bold', 'italic', 'image', 'code-block', 'formula', 'underline', 'indent']],
    clipboard: {
      matchVisual: false,
    },
  };
  // console.log(quillRef, '{Quil text}');

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
        <ReactQuill
          formats={formats}
          ref={commentRef}
          modules={modules}
          onChange={handleChange}
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
