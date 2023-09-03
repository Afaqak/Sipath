'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FileInput, VideoUploadType } from '@/components';

// const VideoUpload = () => {
//   const [videoBodies, setVideoBodies] = useState(1);
//   const [videoType, setVideoType] = useState('free');
//   const handleAddVideoBody = () => {
//     setVideoBodies((prevCount) => prevCount + 1);
//   };
//   return (
//     <div className="relative w-[90%] lg:w-4/6 mx-auto mt-16">
//       <VideoUploadType type={videoType} setType={setVideoType} />
//       <div className="flex flex-col gap-4">
//         {[...Array(videoBodies)].map((_, index) => (
//           <>
//             <div
//               className={`h-[2px] relative w-[84%] lg:w-full bg-[#1850BC] ${
//                 videoBodies > 1 ? 'block' : 'hidden'
//               }`}
//             >
//               <div className="absolute -top-2 -right-14 flex gap-1">
//                 <Image alt="circle" src={'/svgs/add_circle.svg'} width={20} height={20} />
//                 <Image alt="info" src={'/svgs/info.svg'} width={18} height={18} />
//               </div>
//             </div>
//             <div key={index} className="relative">
//               <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
//               <VideoBody />
//             </div>
//           </>
//         ))}
//       </div>

//       <div className="flex justify-end">
//         <button className="bg-black rounded-md px-8 mt-4 py-1 text-white">Publish</button>
//       </div>
//       <div className="flex justify-center mt-4 mb-16">
//         <button onClick={handleAddVideoBody} className=" text-white plus">
//           <Image src={'/svgs/add_video.svg'} alt="add_video" width={35} height={35} />
//         </button>
//       </div>
//     </div>
//   );
// };

const VideoUpload = () => {
  const [videoBodies, setVideoBodies] = useState([...Array(1)].map((_, index) => ({ id: index })));
  const [videoType, setVideoType] = useState('free');

  const handleAddVideoBody = () => {
    setVideoBodies((prevBodies) => [...prevBodies, { id: prevBodies.length }]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideoBodies = Array.from(videoBodies);
    const [movedVideoBody] = reorderedVideoBodies.splice(result.source.index, 1);
    reorderedVideoBodies.splice(result.destination.index, 0, movedVideoBody);

    setVideoBodies(reorderedVideoBodies);
  };

  return (
    <div className="relative w-[90%] lg:w-4/6 mx-auto mt-16">
      <VideoUploadType type={videoType} setType={setVideoType} />
      <div className="flex flex-col gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="videoBodies" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {videoBodies.map(({ id }, index) => (
                  <Draggable key={id} draggableId={`videoBody-${id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/*not showing up*/}
                        <div
                          className={`h-[2px] mb-2 relative w-[84%] lg:w-full bg-[#1850BC] ${
                            videoBodies.length > 1 ? 'block' : 'hidden'
                          }`}
                        >
                          <div className="absolute -top-2 -right-14 flex gap-1">
                            <Image
                              alt="circle"
                              src={'/svgs/add_circle.svg'}
                              width={20}
                              height={20}
                            />
                            <Image alt="info" src={'/svgs/info.svg'} width={18} height={18} />
                          </div>
                        </div>
                        {/*until here*/}
                        <div key={index} className="relative">
                          <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
                          <VideoBody />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-end">
        <button className="bg-black rounded-md px-8 mt-4 py-1 text-white">Publish</button>
      </div>
      <div className="flex justify-center mt-4 mb-16">
        <button onClick={handleAddVideoBody} className=" text-white plus">
          <Image src={'/svgs/add_video.svg'} alt="add_video" width={35} height={35} />
        </button>
      </div>
    </div>
  );
};
export default VideoUpload;

const VideoBody = () => {
  return (
    <div className="p-4 flex flex-col lg:flex-row relative bg-white mb-4 shadow-lg w-full rounded-md justify-between lg:items-center">
      <div className="flex flex-col lg:flex-row gap-8">
        <VideoInfoColumn />
        <QuizUploadColumn />
      </div>
      <VideoandThumbnail />
    </div>
  );
};

const VideoInfoColumn = () => {
  return (
    <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Video title</label>
        <input
          placeholder="Enter title..."
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Video Description</label>
        <textarea
          rows={4}
          cols={4}
          typeof="text"
          placeholder="Enter description"
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
        />
      </div>
    </div>
  );
};

const QuizUploadColumn = () => {
  const [quizFile, setQuizFile] = useState(null);
  const [quizSolutionFile, setQuizSolutionFile] = useState(null);
  return (
    <div className="flex flex-col justify-between mb-4 lg:mb-0 lg:items-center uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Video title</label>
        <input
          placeholder="Enter title..."
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz</label>
        <FileInput file={quizFile} setFile={setQuizFile} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz Solution</label>
        <FileInput file={quizSolutionFile} setFile={setQuizSolutionFile} />
      </div>
    </div>
  );
};

const VideoandThumbnail = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setVideoUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-between text-[#616161] font-light">
      <div
        onClick={handleButtonClick}
        className="lg:h-28 h-36 flex items-center justify-center text-black font-semibold rounded-md w-full bg-[#D9D9D9]"
      >
        {videoUrl ? (
          <video controls className="w-full h-full rounded-md object-contain">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <div className="flex gap-2">
              Upload Video{' '}
              <Image src={'/svgs/upload_video.svg'} width={15} height={15} alt="file" />
            </div>
          </>
        )}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleVideoSelected}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">UPLOAD VIDEO THUMBNAIL</label>
        <FileInput file={thumbnail} setFile={setThumbnail} />
      </div>
    </div>
  );
};
