'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/authentication/passwordInput';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { Icons } from '@/components';
import axios from '../../utils/index';
import { useRouter } from 'next/navigation';
import { successToast, errorToast } from '@/utils/toasts';

const SignUp = () => {
  const router = useRouter();
  const { data: user, update } = useSession();
  const [active, setActive] = useState(false);
  const initialData = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialData);

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
       
      });
    } catch (error) {
      errorToast('An error occured!', '#fb3c22');
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        errorToast('All the field are required to be filled!');
        return;
      }
      if (formData.password.length < 8) {
        errorToast('Passwords length must be 8 or greater!');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        errorToast('Both passwords must be same!');
        return;
      }
      const user = { email: formData.email, password: formData.password };

      const response = await axios.post('/auth/signup', user);
     
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      }).then((data) => {
      
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center flex-col justify-center h-[75vh] md:h-[90vh]">
      <div className="bg-white p-5 w-[80%] md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
        <h2 className="text-center font-semibold text-lg mb-4">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                onChange={handleFormChange}
                disabled={loading}
                placeholder="Email Address"
                type="text"
                className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <PasswordInput
                disabled={loading}
                name={'password'}
                onChange={handleFormChange}
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col">
              <PasswordInput
                disabled={loading}
                name={'confirmPassword'}
                onChange={handleFormChange}
                placeholder="Confirm Password"
              />
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
