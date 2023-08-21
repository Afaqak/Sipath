'use client'

import React, { useState, useRef } from 'react'
import { SubjectDropdown, FileInput,VideoUploadType } from '@/components'

const AddBook = () => {
    const [type, setType] = useState('free')
    const [file, setFile] = useState(null)
    
    return (
        <div className='relative w-[90%] mt-16 md:w-fit mx-auto'>
            <VideoUploadType type={type} setType={setType} />
            <div className=' bg-white flex md:flex-row flex-col uppercase gap-6 p-4 rounded-md shadow-md'>
                <NewBookBodyColumn />
                <UploadBookColumn file={file} setFile={setFile} />
                <CoverPreview />
            </div>
            <div className='flex justify-end'>
                <button className='bg-black rounded-md px-8 mt-4 py-1 text-white'>Add Book</button>
            </div>
        </div>
    )
}

export default AddBook

const NewBookBodyColumn = () => {

    return (
        <div className='flex flex-col gap-4 text-sm'>
            <div className='flex flex-col'>
                <label className='text-[#616161] font-light'>BOOK TITLE</label>
                <input placeholder='Enter title...' className='shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none' type='text' />
            </div>
            <div className='flex flex-col'>
                <label className='text-[#616161] font-light'>DESCRIPTION</label>
                <textarea rows={4} cols={4} typeof='text' placeholder='Enter description' className='shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none ' />
            </div>
        </div>
    )
}

const UploadBookColumn = ({ file, setFile }) => {
    const [dropDown, setDropDown] = useState(null)
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
                <label className='text-sm text-[#616161] font-light'>SUBJECT</label>
                <SubjectDropdown dropDown={dropDown} setDropDown={setDropDown} />
            </div>
            <div className='flex flex-col text-sm text-[#616161] font-light'>
                <label className=''>UPLOAD BOOK FILE</label>
                <FileInput file={file} setFile={setFile} />
                <div className='mt-3 flex gap-2 items-center'>
                    <input type='checkbox'/> ALLOW DOWNLOAD
                </div>
            </div>
        </div>
    )
}


const CoverPreview = () => {
    const [coverImage, setCoverImage] = useState(null);
    const inputRef = useRef(null);

    // Function to handle file input change
    const handleFileInputChange = () => {
        inputRef.current.click();
    };

    // Function to handle selected file
    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Update the state with the selected cover image data URL
                setCoverImage(reader.result);
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            onClick={handleFileInputChange}
            className='bg-[#D9D9D9] text-sm font-bold text-center flex items-center h-48 md:h-auto md:w-32 rounded-md justify-center'
        >
            {coverImage ? (
                <img src={coverImage} alt='Cover Preview' className='w-full h-full rounded-md object-contain' />
            ) : (
                <>
                    Cover <br /> Preview
                </>
            )}
            {/* Input for selecting the cover photo */}
            <input
                ref={inputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelected}
                className='hidden'
            />
        </div>
    );
};
