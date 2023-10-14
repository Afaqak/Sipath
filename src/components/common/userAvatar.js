import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Image from 'next/image';
const UserAvatar = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user?.image ? (
        <div className="relative aspect-square h-full w-full">
          <img src={user.image} alt="profile picture" referrerPolicy="no-referrer" />
        </div>
      ) : (
        <AvatarFallback>
          <span className="uppercase text-white font-medium">
            {' '}
            {user?.name?.[0] || user?.email?.[0] || ''}
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
