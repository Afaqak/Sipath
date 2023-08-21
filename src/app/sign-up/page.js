'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '@/components';

const SignUp = () => {
  const [loading, setLoading] = useState(null);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      setLoading('authenticated');
      router.push('/');
    }
  }, [session.status, router]);

  const handleSignIn = (provider) => {
    setLoading(provider);
    signIn(provider);
  };

  return (
    <>
      {loading === 'authenticated' ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-[75vh] md:h-[90vh]">
          <div className="bg-white p-5 w-[80%]  md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
            <h2 className="text-center font-semibold text-lg mb-4">Sign Up</h2>
            <div className="flex flex-col gap-4">
              <input
                placeholder="Email Address"
                type="text"
                className="shadow-[inset_1px_3px_9px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                name="email"
              />
              <PasswordInput placeholder="Password" />
              <PasswordInput placeholder="Confirm Password" />
              <button className="border-black border-[3px] font-semibold py-1 rounded-md bg-transparent">
                Confirm
              </button>
              <span className="text-center text-lg font-semibold">Or</span>
              <button
                onClick={() => handleSignIn('facebook')}
                className="bg-[#1850BC] shadow-lg flex items-center justify-center gap-2 font-semibold py-[0.35rem] rounded-md text-white"
              >
                {loading === 'facebook' ? (
                  <ClipLoader
                    loading={true}
                    color={'white'}
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <Image
                      alt="facebook"
                      src={'/svgs/facebook.svg'}
                      className="mt-[0.20rem]"
                      width={19}
                      height={19}
                    />{' '}
                    Sign In with Facebook
                  </>
                )}
              </button>
              <button
                onClick={() => handleSignIn('google')}
                className="shadow-lg font-semibold py-[0.35rem] rounded-md bg-white flex items-center justify-center gap-2 "
              >
                {loading === 'google' ? (
                  <ClipLoader
                    loading={true}
                    color={'black'}
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <Image
                      alt="google"
                      src={'/svgs/google.svg'}
                      className="mt-[0.20rem]"
                      width={19}
                      height={19}
                    />{' '}
                    Sign In with Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

function PasswordInput({ placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        className="shadow-[inset_1px_3px_9px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm w-full border-none focus:outline-none"
        name="password"
      />
      <div
        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <img src={'/svgs/eye.svg'} alt="Hide Password" className="h-4 w-4" />
      </div>
    </div>
  );
}
