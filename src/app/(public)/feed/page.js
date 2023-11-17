'use client'
import { Feed } from '@/components'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useSession } from 'next-auth/react'
import React, { Suspense, useEffect, useState } from 'react'
import { FeedSkeleton } from '@/utils/skeletons'

const FeedPage = () => {
    const [posts, setPosts] = useState([])
    const { data: user } = useSession()
    const axios = useAxiosPrivate()
    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get(`/posts`, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`
                    }
                })
                console.log(response?.data)

                setPosts(response?.data)

            } catch (err) {
                console.log(err)
            }
        }
        getPosts()
    }, [])

    return (

        <div className='flex flex-col gap-4'>
            {posts.length > 0 &&
                posts?.map(post => <Feed key={post.id} feed={post} />)
            }
        </div>


    )
}

export default FeedPage