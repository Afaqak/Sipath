import Live from '.';
import useAxios from '@/hooks/useAxios';
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const Page = async ({ params }) => {
    
    console.log(params,"params")
    const session = await getServerSession()
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
            console.log(err);
        }
    };
    const podcast = await fetchPodcast()
    return (
        <div><Live podcast={podcast}/></div>
    )
}

export default Page

