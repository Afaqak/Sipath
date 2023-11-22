'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PasswordInput from '@/components/authentication/passwordInput';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { Icons } from '@/components';
import axios from '@/utils/index';
import { useRouter } from 'next/navigation';
import { successToast, errorToast, warningToast, warningToastNoAction } from '@/utils/toasts';
import { useForm, Controller } from 'react-hook-form';
const SignUp = () => {
  const router = useRouter();
  const { data: user, update } = useSession();
  const [active, setActive] = useState(false);

  const { handleSubmit, control, setValue,watch, formState: {
    errors, isSubmitting
  } } = useForm();

  useEffect(() => {

    if (user && user?.isNewUser) {
      successToast('Signing You Up!', '#1C8827');

      router.push('/on-boarding');
    } else if (user?.user && !user?.isNewUser) {
    
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
      console.log(data,"google")
      });
    } catch (error) {
      errorToast('An error occured!', '#fb3c22');
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (formData) => {

    try {
     
      const user = { email: formData.email, password: formData.password };

      await axios.post('/auth/signup', user);

      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      }).then((data) => {

        router.push('/on-boarding');
        successToast('Signing You Up from submit!', '#1C8827');
        setActive(true);
      });
    } catch (error) {
     warningToastNoAction('An error occured!', '#fb3c22');
      console.error('Error creating user:', error);
    } 
  };


  return (
    <div className="flex items-center flex-col justify-center h-[75vh] md:h-[90vh]">
      <div className="bg-white p-5 w-[80%] md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
        <h2 className="text-center font-semibold text-lg mb-4">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is Required" }}
              render={({ field }) => (

                <div>
                  <input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Email Address"
                    type="text"
                    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] w-full rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              )}

            />
            <div className="flex flex-col">
              <PasswordInput
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                }}
                placeholder="Password"
                disabled={isSubmitting}
                errors={errors.password}
              />
            </div>
            <div className="flex flex-col">
              <PasswordInput
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Confirm Password is required',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                }}
                placeholder="Confirm Password"
                disabled={isSubmitting}
                errors={errors.confirmPassword}
              />
            </div>
            <Button
                disabled={isSubmitting}
                variant="outline"
                className={`border-black border-2 flex gap-2 `}
                type="submit"
              >{
                  isSubmitting &&
                  <span className='animate-spin'><Icons.Loader2 width='20' height='20' stroke='black' /></span>
                }
                Confirm
              </Button>
          </form>
          <span className="text-center text-lg -my-2 font-semibold">Or</span>

          <Button
            disabled={loading || isSubmitting}
            className="w-full gap-2 bg-black flex items-center justify-center"
            onClick={() => {

              handleSignUpWithProvider('google');
            }}
          >
            <Icons.google className="h-4" />
            Sign Up with Google
          </Button>

          <Button
            disabled={loading || isSubmitting}
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
