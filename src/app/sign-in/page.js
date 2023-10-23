'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import from 'next/router' instead of 'next/navigation' for Next.js 12
import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/authentication/passwordInput';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/utils/toasts';

const SignUp = () => {
  const { data: user } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user && user?.isNewUser) {
        successToast('Signing You Up!', '#1C8827');
        router.push('/on-boarding');
      } else if (user?.user && !user?.isNewUser) {
        successToast('Signing You In!', '#1850BC');
        router.push('/');
      }
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((data) => {
        if (data.error !== null) {
          errorToast('An error occurred!', '#fb3c22');
        }
        setLoading(false);
      });
    } catch (error) {
      errorToast('An error occurred!', '#fb3c22');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithProvider = async (provider) => {
    try {
      setLoading(true);
      await signIn(provider, { redirect: false }, { prompt: 'login' }).then((data) => {
        console.log(provider, data);
      });
    } catch (error) {
      errorToast('An error occurred!', '#fb3c22');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col justify-center h-[75vh] md:h-[90vh]">
        <div className="bg-white p-5 w-[80%]  md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
          <h2 className="text-center font-semibold text-lg mb-4">Sign In</h2>

          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex-col flex">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  disabled={loading}
                  placeholder="Email Address"
                  type="text"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 lowercase">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <PasswordInput
                  disabled={loading}
                  name={'password'}
                  register={{
                    ...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                      },
                    }),
                  }}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1 lowercase">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <span className=" text-purple-500 border-purple-500 cursor-pointer border-b -mt-2 w-fit text-sm italic">
                Forgot Password ?
              </span>
              <Button
                disabled={loading}
                variant="outline"
                className={`border-black border-2 flex gap-2 ${
                  loading ? 'bg-black text-white' : ''
                }`}
                type="submit"
              >
                Confirm
              </Button>
            </form>
            <span className="text-center text-lg -my-2 font-semibold">Or</span>

            <Button
              disabled={loading}
              className="w-full gap-2 bg-black flex items-center justify-center"
              onClick={() => {
                handleSignUpWithProvider('google');
              }}
            >
              <Icons.google className="h-4" />
              Sign In with Google
            </Button>

            <Button
              disabled={loading}
              className="w-full hover-bg-[#1850BC] flex items-center gap-2 justify-center bg-[#1850BC]"
              onClick={() => handleSignUpWithProvider('facebook')}
            >
              <Icons.facebook className="h-4" />
              Sign In with Facebook
            </Button>
          </div>
        </div>
        <div className=" text-purple-500  cursor-pointer mt-4 w-fit text-sm ">
          <span className="italic">Don't have an account? </span>
          <Link className="font-semibold border-purple-500  border-b" href={'/sign-up'}>
            Sign Up!
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
