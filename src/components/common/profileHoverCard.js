'use client'

import UserAvatar from "./userAvatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icons } from "@/components";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";



export const ProfileHoverCard = ({ children, user }) => {

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
              <Button variant="outline" className="flex gap-1 rounded-full hover:bg-gray-50"><Icons.chat /> Chat</Button>
              <Button className="bg-main rounded-full hover:bg-blue-800">Follow</Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>

  );
};
