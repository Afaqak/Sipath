import { useState, useRef } from "react";
import { Icons } from "../icons";

export const CustomEditor = ({ onCommentSubmit, reply,  closeReplying }) => {
  const editorRef = useRef(null);
  const [activeFormat, setActiveFormat] = useState(null);
  const fileInputRef = useRef(null)
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFormatText = (format, value = null) => {
    editorRef.current.focus();
    if (format === activeFormat) {
      document.execCommand(format, false, value);
      setActiveFormat(null);
    } else {

      document.execCommand(format, false, value);

      setActiveFormat(format);
    }
  };

  const handleInsertImage = () => {

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile)
    editorRef.current.focus();
    if (selectedFile) {
      setFile(selectedFile);

      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(imageUrl)
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.maxWidth = '100%';
      img.alt='test-images'
      img.style.width = '100px';
      img.style.maxWidth = '100%';

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(img);

      const newRange = document.createRange();
      newRange.setStartAfter(img);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };
  const handleSubmit = () => {

    const filterImages = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const images = doc.querySelectorAll('img');
      images.forEach((img) => img.remove());

      return doc.body.innerHTML;
    };

    const rawHTML = editorRef.current.innerHTML;
    const filteredHTML = filterImages(rawHTML);

    onCommentSubmit({ text: filteredHTML, file });
    setText('');
    setFile(null);
    editorRef.current.innerHTML = '';
  };


  const handleTextChange = () => {
    const currentText = editorRef.current.innerText;
    const currentFileCount = editorRef.current.querySelectorAll('img').length;
  
    if (currentText.trim() === '' && currentFileCount === 0) {
      setFile(null); 
    }
  
    setText(currentText);
  };
  

  return (
    <div className="bg-gray-100 text-subcolor3 rounded-md shadow-md">
      <div className="flex space-x-2 p-2">
        <button
          className={`${activeFormat === 'bold' ? 'bg-gray-200' : ''
            } text-subcolor3 px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('bold')}
        >
          <b>B</b>
        </button>
        <button
          className={`${activeFormat === 'italic' ? 'bg-gray-200' : ''
            } px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('italic')}
        >
          <i>I</i>
        </button>
        <button
          className={`${activeFormat === 'underline' ? 'bg-gray-200' : ''
            } px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('underline')}
        >
          <u>U</u>
        </button>
        <button
          className={`${activeFormat === 'strikeThrough' ? 'bg-gray-200' : ''
            } px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('strikeThrough')}
        >
          <s>S</s>
        </button>
        <button
          className={`${activeFormat === 'insertImage' ? 'bg-gray-200' : ''
            } px-2 py-1 rounded focus:outline-none `}
          onClick={handleInsertImage}
        >
          <Icons.image_icon width="2" height="20" className="w-4 text-sm h-4" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          className={`${activeFormat === 'fontName' ? 'bg-gray-200' : ''
            } px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('fontName', 'Courier New')}
        >
          <Icons.code_icon width="17" height="17" className="w-5 text-sm h-5" />
        </button>
      </div>
      <div
        onInput={handleTextChange}

        ref={editorRef}
        contentEditable
        className="border focus:outline-none focus:ring ring-gray-200 rounded-b-md p-4 font-mono"
        placeholder="Start typing..."
      ></div>
      <div className='w-full flex gap-2 pb-2 pr-2 justify-end'>
        <button
          onClick={handleSubmit}
          className="bg-main text-white px-4 text-sm font-semibold py-1 rounded mt-2"
        >
          {reply ? "Reply" : "Add Comment"}

        </button>
        {reply &&
          <button
            onClick={ closeReplying}
            className="bg-subcolor2 text-white px-4 text-sm font-semibold py-1 rounded mt-2"
          >
            Close

          </button>
        }
      </div>

    </div>
  );
};

