'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { PasswordInput } from '@/components/authentication/passwordInput';
import { createUser } from '@/features/auth/authThunk';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { setUserDataAndToken } from '@/features/auth/authSlice';
import { useToast } from '@/components/hooks/use-toast';
import { Icons } from '@/components';

const SignUp = () => {
  const { toast } = useToast();
  const { data: user } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loadingSignUp, setLoadingSignUp] = useState(null);
  const [loadingGoogleSignUp, setLoadingGoogleSignUp] = useState(null);
  const [loadingFacebookSignUp, setLoadingFacebookSignUp] = useState(null);

  console.log(user, 'user from client');
  useEffect(() => {
    console.log(user);
    dispatch(setUserDataAndToken(user));
    if (user && user?.isNewUser) {
      toast({
        title: 'Signing You Up 👌',
        description: 'Time to create your Profile...🚀',
      });

      router.push('/on-boarding');
    } else if (user?.user && !user?.isNewUser) {
      console.log('here');
      toast({
        title: 'Signing You In! 🟢',
        description: 'You already have an account',
      });
      router.push('/');
    }
  }, [user]);

  const handleSignUpWithProvider = async (provider) => {
    try {
      if (provider === 'google') {
        setLoadingGoogleSignUp(true);
      } else {
        setLoadingFacebookSignUp(true);
      }
      await signIn(provider);
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
    setLoadingSignUp();
    try {
      const { password, email, confirmPassword } = data;
      if (confirmPassword !== password) {
        toast({
          title: 'Passwords do not match',
          variant: 'destructive',
        });
      }

      const user = { email, password };
      setLoading(true);

      dispatch(createUser({ user, onSuccess, onReject }));
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
    setLoadingSignUp(false);
  };
  const onReject = () => {
    setLoading(false);
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
              <input
                {...register('email', { required: true })}
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
              <Button
                isLoading={loadingSignUp}
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
              className="w-full hover:bg-[#1850BC] flex items-center gap-2 justify-center bg-[#1850BC]"
              onClick={() => handleSignUpWithProvider('facebook')}
            >
              {loadingFacebookSignUp ? null : <Icons.facebook className="h-3" />}
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
