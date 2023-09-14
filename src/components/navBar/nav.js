'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
export const Navbar = () => {
  const user = useSelector((state) => state.userAuth.user);
  const { data } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [nav, setNav] = React.useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

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

  const links = [
    { href: '/videos', label: 'Videos' },
    { href: '/premium', label: 'Premium' },
    { href: '/podcast', label: 'Podcast' },
    { href: '/experts', label: 'Experts' },
    { href: '/categories', label: 'Categories' },
    { href: '/practice', label: 'Practice' },
  ];

  return (
    <>
      <nav className=" fullShadow">
        <div
          className="
          justify-between bg-white fullShadow h-[8vh] hidden lg:flex sticky
        "
        >
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-4 bg-black rounded-r-full cursor-pointer px-4"
          >
            <Image alt="logo" className="" src="/logo.png" width={80} height={50} />
          </div>
          <ul className="flex items-center  gap-4 ml-4 font-semibold">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative px-3 py-1 outline-2 focus-visible:outline-2 ${
                  pathname.includes(link.href)
                    ? 'text-white'
                    : 'text-black hover:opacity-60 transition-colors duration-300'
                }`}
                href={link.href}
              >
                {pathname.includes(link.href) && (
                  <motion.div
                    style={{ borderRadius: 99999 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="absolute inset-0 bg-[#1850BC]"
                    layoutId="active-pill"
                  ></motion.div>
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </ul>
          <div
            className={`flex items-center cursor-pointer ${user ? 'gap-6' : 'gap-4'} mr-6 text-sm`}
          >
            {data || user ? (
              <>
                <Image alt="message icon" src={'/svgs/message.svg'} width={20} height={20} />
                <Image alt="bell icon" src={'/svgs/Union.svg'} width={20} height={20} />
                <Image alt="account icon" src={'/svgs/accountcircle.svg'} width={20} height={20} />
                <button
                  onClick={() => {
                    if (user) {
                      localStorage.removeItem('token');
                      location.reload();
                    } else {
                      signOut({ callbackUrl: '/' });
                    }
                  }}
                  className="bg-red px-4 py-1 bg-red-600 font-medium text-white"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="py-[0.18rem] font-medium px-4 xl:px-6 border-[3px] rounded-md border-blue-500 text-blue-500"
                  href="/sign-in"
                >
                  Sign in
                </Link>
                <Link
                  className="py-[0.18rem] font-medium px-4 xl:px-6 border-[3px] rounded-md border-black text-black"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="mb-20 md:mb-28 lg:mb-0">
        <div
          className={`justify-between fixed w-full z-[3000] bg-white shadow-md text-lg h-[7vh] flex lg:hidden `}
        >
          <div
            onClick={() => router.push('/')}
            className="flex items-center gap-4 bg-black cursor-pointer rounded-r-full px-4"
          >
            <Image src="/logo.png" alt="logo" width={80} height={50} />
          </div>

          <div onClick={toggleNav} className="z-[1100] self-center cursor-pointer mr-4">
            <div className="flex-col flex h-11 relative w-11 justify-center rounded-full bg-gradient-to-r ">
              <motion.div
                animate={nav ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                className="flex flex-col bg-bbPrimary justify-between h-1 w-7 mb-1 cursor-pointer bg-black"
              ></motion.div>
              <motion.div
                animate={nav ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="flex flex-col bg-bbPrimary justify-between h-1 w-7 cursor-pointer bg-black"
              ></motion.div>
            </div>
          </div>
        </div>
      </nav>
      <motion.div
        initial={{ x: 1000 }}
        animate={nav ? { x: 0 } : { x: 1000 }}
        className="w-full lg:hidden flex-col items-center justify-center min-h-screen fixed z-[1500] bg-white  right-0 top-0"
      >
        <ul
          className="flex gap-6 flex-col text-2xl cursor-pointer 
      items-center justify-center h-screen px-4 uppercase font-semibold text-bbPrimary 
      "
        >
          <Link href="/videos">Videos</Link>
          <Link href="/premium">Premium</Link>
          <Link href="/podcast">Podcast</Link>
          <Link href="/experts">Experts</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/practice">Practice</Link>
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
        </ul>
      </motion.div>
    </>
  );
};
