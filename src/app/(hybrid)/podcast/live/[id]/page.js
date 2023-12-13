import Live from '.';
import useAxios from '@/hooks/useAxios';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const Page = async ({ params }) => {
    
    console.log(params,"params")
    const session = await getServerSession(authOptions)
    const axios=useAxios()
    if (!session) {
        redirect('/podcast')
    }
    const fetchPodcast = async () => {
        try {
            const response = await axios.get(`/podcasts/${params?.id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            });

            return response?.data
        } catch (err) {
            return err.response.data?.asset
            console.log(err.response.data);
        }
    };
    const podcast = await fetchPodcast()
    return (
        <div><Live podcast={podcast}/></div>
    )
}

export default Page

