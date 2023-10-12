'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/authentication/passwordInput';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { Icons } from '@/components';
import toast from 'react-hot-toast';
import axios from '../../utils/index';
import { useRouter } from 'next/navigation';
import { successToast } from '@/utils/toasts';

const SignUp = () => {
  const router = useRouter();
  const { data: user, update } = useSession();
  const [active, setActive] = useState(false);
  console.log(user);
  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(user);
    if (user && user?.isNewUser) {
      successToast('Signing You Up!', '#1C8827');

      router.push('/on-boarding');
    } else if (user?.user && !user?.isNewUser) {
      console.log('here');
      successToast('Signing You In!', '#1850BC');

      if (!active) {
        router.push('/');
      }
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const handleSignUpWithProvider = async (provider) => {
    try {
      setLoading(true);
      await signIn(provider, { redirect: false }, { prompt: 'login' }).then((data) => {
        console.log(data, 'provider');
      });
    } catch (error) {
      errorToast('An error occured!', '#fb3c22');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { password, email } = data;

      const user = { email, password };
      const response = await axios.post('/auth/signup', user);
      console.log(response, 'response');
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((data) => {
        console.log('provider', data);
        successToast('Signing You Up!', '#1C8827');
        setActive(true);
        router.push('/on-boarding');
      });
    } catch (error) {
      errorToast('An error occured!', '#fb3c22');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-[75vh] md:h-[90vh]">
      <div className="bg-white p-5 w-[80%] md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
        <h2 className="text-center font-semibold text-lg mb-4">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col">
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
                <span className="text-red-500 text-sm mt-1 lowercase">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <PasswordInput
                disabled={loading}
                name={'confirmPassword'}
                register={{
                  ...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === getValues('password') || 'Passwords do not match',
                  }),
                }}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 lowercase">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              disabled={loading}
              variant="outline"
              className={`border-black flex gap-2 ${loading ? 'bg-black text-white' : ''}`}
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
              console.log('clicked');
              handleSignUpWithProvider('google');
            }}
          >
            <Icons.google className="h-4" />
            Sign Up with Google
          </Button>

          <Button
            disabled={loading}
            className="w-full hover:bg-[#1850BC] flex items-center gap-2 justify-center bg-[#1850BC]"
            onClick={() => handleSignUpWithProvider('facebook')}
          >
            <Icons.facebook className="h-4" />
            Sign Up with Facebook
          </Button>
        </div>
      </div>

      <div className="text-purple-500 cursor-pointer mt-4 w-fit text-sm">
        <span className="italic">Already have an account? </span>
        <Link className="font-semibold border-purple-500  border-b" href={'/sign-in'}>
          Sign In!
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
