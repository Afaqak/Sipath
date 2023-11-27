import { useState, useRef, useEffect } from "react";
import { Icons } from "../icons";

export const CustomEditor = ({ onCommentSubmit, reply, closeReplying }) => {
  const editorRef = useRef(null);
  const [isMounted,setIsMounted]=useState(false)
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    fontName: false,
    insertImage: false,
  });
  const fileInputRef = useRef(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFormatText = (format, value = null) => {
    editorRef.current.focus();
    document.execCommand(format, false, value);

    setFormatting((prevFormatting) => ({
      ...prevFormatting,
      [format]: !prevFormatting[format],
    }));
  };

  const handleInsertImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    editorRef.current.focus();

    if (selectedFile) {
      setFile(selectedFile);

      const imageUrl = URL.createObjectURL(selectedFile);
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.maxWidth = '100%';
      img.alt = 'test-images';
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
  console.log(formatting)

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

    onCommentSubmit({
      text: filteredHTML,
      file,
      setData: () => {
        setText('');
        setFile(null);
      },
    });
    editorRef.current.innerHTML = '';
  };

  const handleTextChange = () => {
    const currentText = editorRef.current.innerText;
    const currentFileCount = editorRef.current.querySelectorAll('img').length;
  
    if (currentFileCount === 0) {
      setFile(null);
    }
  
    setText(editorRef.current.innerHTML);
  
    // Check if bold formatting is active
    const isBoldActive = document.queryCommandState('bold');
  
    // If text is being cleared and bold was active, reapply bold formatting
    if (!currentText && isBoldActive) {
      handleFormatText('bold');
    }
  };
  


  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted) return null

  return (
    <div className="bg-gray-100 text-subcolor3 rounded-md shadow-md">
      <div className="flex space-x-2 p-2">
        <button
          className={`${formatting.bold ? 'bg-gray-200' : ''
            } text-subcolor3 px-2 py-1 rounded focus:outline-none `}
          onClick={() => handleFormatText('bold')}
        >
          <b>B</b>
        </button>
    
        <button
          className={`${formatting.insertImage ? 'bg-gray-200' : ''
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
            onClick={closeReplying}
            className="bg-subcolor2 text-white px-4 text-sm font-semibold py-1 rounded mt-2"
          >
            Close
          </button>
        }
      </div>
    </div>
  );
};
