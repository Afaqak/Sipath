'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import UserAvatar from '../common/userAvatar';
import { Icons } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { errorToast } from '@/utils/toasts';
import { motion } from 'framer-motion'

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useSession();
  const toggleRef = useRef();
  const [nav, setNav] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const toggleNav = () => {
    setNav(!nav);
  };

  useOutsideClick(toggleRef, () => setToggleMenu(false));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNav(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setNav(false);
  }, [pathname]);

  const signedInlinks = [
    { href: '/feed', label: 'Feed' },
    { href: '/videos', label: 'Videos' },
    { href: '/premium', label: 'Premium' },
    { href: '/podcast', label: 'Podcast' },
    { href: '/experts', label: 'Experts' },
    { href: '/categories', label: 'Categories' },
    { href: '/practice', label: 'Practice' },
    { href: '/courses', label: 'Courses' },
  ];
  const signedOutLinks = [
    { href: '/videos', label: 'Videos' },
    { href: '/premium', label: 'Premium' },
    { href: '/podcast', label: 'Podcast' },
    { href: '/experts', label: 'Experts' },
    { href: '/categories', label: 'Categories' },
    { href: '/practice', label: 'Practice' },
    { href: '/courses', label: 'Courses' },
  ];

  const linksToShow = user?.token ? signedInlinks : signedOutLinks;

  return (
    <>
      <nav className="fullShadow ">
        <div className="justify-between bg-white fullShadow h-[8vh] hidden lg:flex ">
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-4 bg-black rounded-r-full cursor-pointer px-4"
          >
            <Image alt="logo" className="" src="/logo.png" width={80} height={45} />
          </div>
          <ul className="flex items-center gap-4 ml-4 font-semibold">
            {linksToShow.map((link) => (
              <Link
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative px-3 py-1 outline-2 focus-visible:outline-2 ${pathname.includes(link.href)
                    ? 'text-white'
                    : 'text-black hover:opacity-60 transition-colors duration-300'
                  }`}
                href={link.href}
              >
                {pathname.includes(link.href) && (
                  <div className="absolute inset-0 bg-main rounded-full"></div>
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </ul>
          <div
            className={`flex items-center cursor-pointer ${user ? 'gap-6' : 'gap-4'} mr-6 text-sm`}
          >
            {user?.token ? (
              <>
                <Link href={'/chat'}>
                  <Icons.chatBlack className="w-6 h-6 focus:scale-90 transition-all duration-300 ease-in-out" />
                </Link>

                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <UserAvatar
                        onClick={() => setToggleMenu(!toggleMenu)}
                        user={{
                          image: user?.user?.profile_image,
                          name:
                            user?.user?.display_name?.slice(0, 1) ||
                            user?.user?.first_name?.slice(0, 1) ||
                            user?.email?.slice(0,1),
                        }}
                        className="h-7 w-7 focus:outline-none text-sm "
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{user?.user?.display_name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          router.push('/my-profile');
                        }}
                        className="flex gap-2"
                      >
                        <Icons.profile className="h-4 w-4 stroke-subcolor3" />
                        My-profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          errorToast('Logging Out');
                          await signOut({
                            callbackUrl: '/',
                          }).then((res) => { });
                        }}
                        className="flex gap-2"
                      >
                        <Icons.logout className="h-4 w-4 " />
                        logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'border-blue-500 text-blue-500 hover:text-blue-500'
                  )}
                  href="/sign-in"
                >
                  Sign in
                </Link>
                <Link
                  className={cn(buttonVariants({ variant: 'outline' }), 'border-black')}
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="mb-12 md:mb-28 lg:mb-0">
        <div
          className={`justify-between fixed w-full z-[3000] bg-white shadow-md text-lg h-[7vh] flex lg:hidden `}
        >
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-4 bg-black cursor-pointer rounded-r-full px-4"
          >
            <Image src="/logo.png" alt="logo" width={80} height={50} />
          </div>
          <div className="flex gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserAvatar
                  onClick={() => setToggleMenu(!toggleMenu)}
                  user={{
                    image: user?.user?.profile_image,
                    name: user?.user?.display_name?.slice(0, 1) || user?.user?.first_name?.slice(0, 1) || user?.user?.email?.slice(0, 1),
                  }}
                  className="h-7 w-7 focus:outline-none"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.user?.display_name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push('/my-profile');
                  }}
                  className="flex gap-2"
                >
                  <Icons.profile className="h-4 w-4 stroke-subcolor3" />
                  My-profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    errorToast('Logging Out');
                    await signOut({
                      callbackUrl: '/',
                    }).then((res) => { });
                  }}
                  className="flex gap-2"
                >
                  <Icons.logout className="h-4 w-4 " />
                  logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <motion.div
              onClick={toggleNav}
              className="z-[4000] relative self-center cursor-pointer "
            >
              <div className="flex-col flex h-11 relative w-11 justify-center rounded-full bg-gradient-to-r">
                <motion.div
                  animate={{
                    rotate: nav ? 45 : 0,
                    translateY: nav ? 3 : 0,
                  }}
                  className={`flex flex-col justify-between h-1 w-6 mb-1 cursor-pointer bg-black transform `}
                ></motion.div>
                <motion.div
                  animate={{
                    rotate: nav ? -45 : 0,
                    translateY: nav ? -4 : 0,
                  }}
                  className={`flex flex-col justify-between h-1 w-6 cursor-pointer bg-black transform `}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>

      <motion.div
        className={`min-w-full max-w-screen lg:hidden flex-col items-center justify-center h-screen fixed z-[1500] bg-white right-0 left-0 top-0 transition-transform duration-300 `}
        initial={{ translateX: '100%' }}
        animate={{ translateX: nav ? 0 : '100%' }}
        transition={{
          type: 'spring',
          duration: 0.1,
        }}
      >
        <ul className="flex gap-6 flex-col text-2xl cursor-pointer items-center justify-center h-screen px-4 uppercase font-semibold text-bbPrimary">
          {linksToShow.map((link) => (
            <motion.li
              key={link.href}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                onClick={() => router.push(link.href)}
                className={`relative px-3 py-1 outline-2 focus-visible:outline-2 ${pathname.includes(link.href)
                    ? 'text-white'
                    : 'text-black hover:opacity-60 transition-colors duration-300'
                  }`}
                href={link.href}
              >
                {pathname.includes(link.href) && (
                  <div className="absolute inset-0 bg-main rounded-full"></div>
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.li>
          ))}
          {!user?.token && (
            <div className="flex items-center gap-4 mr-4 mt-4 text-sm">
              <Link
                className="py-1 px-8  border-blue-500 text-blue-500 border-[3px] rounded-md"
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="py-1 px-8 border-[3px] rounded-md border-black text-black"
                href="/sign-up"
              >
                Sign up
              </Link>
            </div>
          )}
        </ul>
      </motion.div>
    </>
  );
};
