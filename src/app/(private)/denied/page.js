'use client'

import React from 'react'
import { Icons } from '@/components'

const Denied = () => {
    return (
        <div className='h-screen flex items-center justify-center flex-col gap-2'>
            <div
                className={` w-[10rem] h-[10rem] relative rounded-full flex items-center justify-center  transition duration-300 transform bg-subcolor2`}
            >

                <Icons.cross  className="h-16 w-16 fill-white" />
            </div>
            <h2 className='text-6xl font-bold'>ACCESS DENIED</h2>
        </div>
    )
}

export default Denied