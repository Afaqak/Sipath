'use client'

import UserAvatar from "./userAvatar";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "@/components";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useSession } from "next-auth/react";
import { successToast, warningToast } from "@/utils/toasts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RequestModal } from "../chat/requestModal";
import { ChatRequestModal } from "../chat/chatRequestModal";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";


export const ProfileHoverCard = ({ children, user }) => {
  const [loading, setLoading] = useState(false)
  const { data } = useSession()
  const router = useRouter()
  const axios=useAxiosPrivate()
  const [open, setOpen] = useState(false)
  const [requestLoading,setRequestLoading]=useState(false)
  async function getUserConversations() {

    if (!data?.token) return warningToast('Sign In in to Chat!')
    try {
  setLoading(true)
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data?.token}`
        }
      })
      const response = await request.json()
      
      const userConversation = response?.userChats.find(convo =>
        (convo?.chat_member_1.id === user?.id && convo?.chat_member_2.id === data?.user?.id) || (convo.chat_member_1.id === data?.user?.id && convo?.chat_member_2.id === user?.id)
      );
  
      if (userConversation) {
        router.push(`/chat?convo_id=${userConversation?.id}`)
      } else {
        setOpen(true)
      }

    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }

  }

  const handleMessageRequest = async (message, onClose) => {
    if (!message) return warningToast("No Message!")
    try {
    setRequestLoading(true)
      await axios.post(`chats/request/${user?.id}`, {
        message
      }, {
        headers: {
          Authorization: `Bearer ${data?.token}`
        }
      })
      onClose()
      successToast("Conversation Request Sent!")

    } catch (error) {
      console.log(error)
    } finally{
      setRequestLoading(false)
    }
  }


  return (
    <HoverCard >
      <HoverCardTrigger asChild>
        <Link className='block' href={`/profile/${user?.id}`}>
          {children}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="z-[5000]" offset={-4} align="start">
        <div className="flex gap-3 ">
          <UserAvatar className="w-8 h-8 z-[1000] cursor-pointer" user={{ image: user?.profile_image, name: user?.display_name }} />
          <div className="flex flex-col gap-1 items-start">
            <Badge className={"z-[1000] cursor-pointer"}>{user?.isTutor ? "Tutor" : "User"}</Badge>
            <h4 className="font-semibold text-sm">{user?.display_name}</h4>
            <p className='flex gap-1 text-[0.75rem] font-bold'><Image src={'/svgs/star.svg'} alt="star" width={20} height={20} /> {user?.rating > 0 ?
              user?.rating.slice(0, -1) : 0
            }</p>
            <div className='flex gap-2 mt-2 text-sm z-[1000] cursor-pointer'>
              <Button onClick={getUserConversations} variant="outline" className="flex gap-1 rounded-full hover:bg-gray-50">
                {loading ? <span className="animate-spin"><Icons.Loader2 width="20" height="20" stroke="black" /></span> :
                  <Icons.chat />} Chat</Button>
              <Link href={`/profile/${user?.id}`} className={cn(buttonVariants('default'), 'bg-main rounded-full')}>Visit</Link >
            </div>
          </div>
        </div>
      </HoverCardContent>
      <ChatRequestModal loading={requestLoading} checkPrevious={true} handleSubmit={handleMessageRequest} isOpen={open} setIsOpen={setOpen} />
    </HoverCard>

  );
};
