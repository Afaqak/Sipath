'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const initialData = {
    email: '',
    password: '',
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
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
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData, 'formdata');
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      errorToast('All fields are required to be filled!');
    }
    try {
      setLoading(true);
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
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
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex-col flex">
                <input
                  disabled={loading}
                  placeholder="Email Address"
                  onChange={handleFormChange}
                  type="text"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
              </div>
              <div>
                <PasswordInput
                  onChange={handleFormChange}
                  disabled={loading}
                  name={'password'}
                  placeholder="Password"
                />
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
