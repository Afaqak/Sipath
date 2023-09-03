'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PasswordInput } from '@/components/authentication/passwordInput';
import { createUser } from '@/features/auth/authThunk';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtility';

const SignUp = () => {
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSuccess = () => {
    showSuccessToast(router, setLoading, 'Logged In 👌', '/on-boarding');
  };

  const onError = () => {
    console.error('run err');
    showErrorToast(setLoading);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { password, email, confirmPassword } = data;
      if (confirmPassword !== password) {
        return showErrorToast(setLoading, 'Err.. Try Again');
      }
      console.log(data);

      const user = { email, password };

      dispatch(createUser({ user, onSuccess, onError }));
    } catch (error) {
      setLoading(false);
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[75vh] md:h-[90vh]">
        <div className="bg-white p-5 w-[80%]  md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
          <h2 className="text-center font-semibold text-lg mb-4">Sign Up</h2>
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input
                {...register('email', {
                  required: true,
                })}
                disabled={loading}
                placeholder="Email Address"
                type="text"
                className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                name="email"
              />
              <PasswordInput
                disabled={loading}
                name={'password'}
                register={register('password', { required: true })}
                placeholder="Password"
              />
              <PasswordInput
                disabled={loading}
                name={'confirmPassword'}
                register={register('confirmPassword', { required: true })}
                placeholder="Confirm Password"
              />

              <button
                disabled={loading}
                type="submit"
                className={`justify-center py-1 shadow-md flex items-center hover:bg-black ${
                  loading ? 'hover:bg-white border-black' : 'hover:bg-black'
                } transition-all duration-300 ease-in-out hover:text-white border-black text-black font-medium border-[3px] rounded-md`}
              >
                {loading ? (
                  <ClipLoader
                    loading={true}
                    color={'black'}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  'Confirm'
                )}
              </button>
            </form>
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
    </>
  );
};

export default SignUp;
