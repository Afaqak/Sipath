'use client'

import React, { useState } from 'react'

import { SubjectDropdown, FileInput } from '@/components'

const NewQuiz = () => {
    return (
        <div className='relative w-[90%] lg:w-[60%] mx-auto'>
            <div className=' mt-16 bg-white flex uppercase flex-col gap-4 p-4 rounded-md shadow-md'>
                <NewQuizBodyRow />
                <UploadQuizRow />
            </div>
            <div className='flex justify-end'>
                <button className='bg-black rounded-md px-8 mt-4 py-1 text-white'>Publish</button>
            </div>
        </div>
    )
}

export default NewQuiz

const NewQuizBodyRow = () => {
    const [dropDown, setDropDown] = useState(null)

    return (
        <div className='flex gap-4 text-[#616161] font-light'>
            <div className='flex flex-col'>
                <label className='text-sm font-light'>Video title</label>
                <input placeholder='ENTER TITLE' className='shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] w-48 rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none' type='text' />
            </div>
            <div className='flex flex-col'>
                <label className='text-sm text-[#616161] font-light'>Payment Method</label>
                <SubjectDropdown dropDown={dropDown} setDropDown={setDropDown} />
            </div>
        </div>
    )
}

const UploadQuizRow = () => {
    return (
        <div className='flex gap-4'>
            <div className='flex flex-col'>
                <label className='text-sm text-[#616161] font-light'>Upload Quiz Solution</label>
                <FileInput />
            </div>
            <div className='flex flex-col'>
                <label className='text-sm text-[#616161] font-light'>Upload Quiz Solution</label>
                <FileInput />
            </div>
            <div className='flex flex-col'>
                <label className='text-sm text-[#616161] font-light'>Upload Quiz Solution</label>
                <FileInput />
            </div>
        </div>
    )
}


