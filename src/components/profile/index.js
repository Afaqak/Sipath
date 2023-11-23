import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogFooter,
  } from '@/components/ui/dialog';
  import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { FileInput } from "../tutors/fileInput";
  import { actionTabsTutor, actionTabsUser } from '@/utils/tabs';
  import { successToast } from "@/utils/toasts";
  import useAxiosPrivate from "@/hooks/useAxiosPrivate";
  import UserAvatar from "../common/userAvatar";
import { Icons } from "../icons";


export const ActionButtons = ({user}) => {
    const actionButtons=user?.isTutor?actionTabsTutor:actionTabsUser
    return (
      <div className="grid grid-cols-2 flex-row text-sm">
        {actionButtons.map((button, index) => (
          <DropdownMenuItem key={index}>        
            <Link
            className={`border-2 border-${button.bgColor} w-full px-3 py-1 whitespace-nowrap justify-center items-center font-bold flex gap-2 text-[0.7rem] text-${button.bgColor} bg-transparent rounded`}
            href={button.href}
            key={index}
          >
            <Image
              src={button.imageSrc}
              className="w-4 h-4"
              width={25}
              height={25}
              alt={button.alt}
            />
            <span className="hidden md:block">{button.text}</span>
          </Link>
          </DropdownMenuItem>
  
        ))}
      </div>
    );
  }
  
  
  
  export function ProfilePictureUpdate({ isOpen, setIsOpen, session }) {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null);
    const privateAxios = useAxiosPrivate()
    const { data, update } = useSession()
    const closeDialog = () => {
      setIsOpen(false);
    };
    async function handleImageSubmit() {
  
      const formDataToSend = new FormData()
      formDataToSend.append('profile_image', image)
  
      try {
        setLoading(true)
        if (image) {
          const userResponse = await privateAxios.patch('/users/profile', formDataToSend, {
            headers: {
              'Authorization': `Bearer ${session?.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
  
  
          successToast("Updated Profile Pic!")
          const newSession = {
            user: {
              user: userResponse?.data?.user,
              tutor: data?.tutor
            },
          };
          await update(newSession);
          closeDialog()
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  
    // console.log("session check",session)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="profile-modal">
        <DialogContent className="sm:max-w-[425px] shadow-md bg-white">
          <DialogHeader className="text-xl font-semibold py-4 border-b">Update Profile Picture</DialogHeader>
          <DialogDescription className="py-4">
            {!image && (
              <div className="text-center mb-4">
                <UserAvatar className="w-28 h-28 mb-2" user={{ image: session?.user?.profile_image, name: session?.user?.display_name }} />
              </div>
            )}
            {image && (
              <div className="text-center mb-4">
                <UserAvatar className="w-28 h-28 mb-2" user={{ image: URL.createObjectURL(image) }} />
              </div>
            )}
            <FileInput file={image} setFile={setImage} />
          </DialogDescription>
          <DialogFooter className="flex justify-end p-4">
            <Button disabled={loading} variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button disabled={loading} className=" px-4 py-2 flex gap-2 rounded" onClick={handleImageSubmit}>
              {loading && <span className='w-4 h-4 animate-spin'><Icons.Loader2 stroke="white" /></span>}
              Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  