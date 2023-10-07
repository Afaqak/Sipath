'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PasswordInput } from '@/components/authentication/passwordInput';
import { createUser } from '@/features/auth/authThunk';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { setUserDataAndToken } from '@/features/auth/authSlice';
import { useToast } from '@/components/hooks/use-toast';
import { Icons } from '@/components';
import axios from '../../utils/index';

const SignUp = () => {
  const { toast } = useToast();
  const { data: user, update } = useSession();

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [loadingGoogleSignUp, setLoadingGoogleSignUp] = useState(false);
  const [loadingFacebookSignUp, setLoadingFacebookSignUp] = useState(false);

  const handleSignUpWithProvider = async (provider) => {
    try {
      if (provider === 'google') {
        setLoadingGoogleSignUp(true);
      } else {
        setLoadingFacebookSignUp(true);
      }
      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error) {
      toast({
        title: 'There was a problem.',
        description: `There was an error logging in with ${provider}`,
        variant: 'destructive',
      });
    } finally {
      if (provider === 'google') {
        setLoadingGoogleSignUp(false);
      } else {
        setLoadingFacebookSignUp(false);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoadingSignUp(true);
      const { password, email } = data;
      console.log(loadingSignUp);
      const user = { email, password };
      const response = await axios.post('/auth/signup', user);
      console.log(response, 'response');
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/on-boarding',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const onSuccess = () => {
    toast({
      title: 'Signing You Up 👌',
      description: 'Time to create your Profile...🚀',
    });
    router.push('/on-boarding');
    reset();
  };
  const onReject = () => {
    toast({
      title: 'There was a problem.',
      description: `There was an error logging in.`,
      variant: 'destructive',
    });
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
                disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
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
                disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
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
                disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
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
              isLoading={loadingSignUp}
              disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
              variant="outline"
              className={`border-black flex gap-2 ${loadingSignUp ? 'bg-black text-white' : ''}`}
              type="submit"
            >
              Confirm
            </Button>
          </form>
          <span className="text-center text-lg -my-2 font-semibold">Or</span>

          <Button
            isLoading={loadingGoogleSignUp}
            disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
            className="w-full gap-2 bg-black flex items-center justify-center"
            onClick={() => {
              console.log('clicked');
              handleSignUpWithProvider('google');
            }}
          >
            {loadingGoogleSignUp ? null : <Icons.google className="h-4" />}
            Sign Up with Google
          </Button>

          <Button
            isLoading={loadingFacebookSignUp}
            disabled={loadingFacebookSignUp || loadingGoogleSignUp || loadingSignUp}
            className="w-full hover:bg-[#1850BC] flex items-center gap-2 justify-center bg-[#1850BC]"
            onClick={() => handleSignUpWithProvider('facebook')}
          >
            {loadingFacebookSignUp ? null : <Icons.facebook className="h-4" />}
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
