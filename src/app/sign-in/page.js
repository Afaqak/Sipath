'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInUser } from '@/features/auth/authThunk';
import { useDispatch ,useSelector} from 'react-redux';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/authentication/passwordInput';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';1
import { setUserDataAndToken } from '@/features/auth/authSlice';
import { useToast } from '@/components/hooks/use-toast';
import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
const SignUp = () => {
  const {toast}=useToast()
  const { data: user } = useSession();
  const [loadingSignIn, setLoadingSignIn] = useState(null);
  const [loadingGoogleSignIn, setLoadingGoogleSignIn] = useState(null);
  const [loadingFacebookSignIn, setLoadingFacebookSignIn] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSuccess = () => {
    toast({
      title: 'Signing You In! 🟢',
    });
    router.push('/')
    setLoadingSignIn(false)
  };

  useEffect(() => {
    console.log(user)
    dispatch(setUserDataAndToken(user));
    if ((user && user?.isNewUser)) {
     
      toast({
        title: 'Signing You Up 👌',
        description: 'Time to create your Profile...🚀',
      })

      router.push('/on-boarding');
    } else if (user?.user && !user?.isNewUser) {
      console.log("here")
      toast({
        title: 'Signing You In! 🟢',
      });
      router.push('/');
    }
  }, [user]);

  const onError = () => {
    setLoadingSignIn(false)
    toast({
      title:"There was a problem.",
      description:`There was an error logging in.`,
      variant:"destructive"
    })
  };


  const onSubmit = async (data) => {
    console.log('clicked')
    setLoadingSignIn(true)
    console.log(loadingSignIn)
    try {
      const { password, email } = data;

      const user = { email, password };

      dispatch(signInUser({ user, onSuccess ,onError}));
    } catch (error) {
      toast({
        title:"There was a problem.",
        description:`There was an error logging in.`,
        variant:"destructive"
      })
    }finally{
      setLoadingSignIn(false)
    }
  };


  const handleSignUpWithProvider = async (provider) => {

    try{
      if(provider==="google"){
        setLoadingGoogleSignIn(true)
      }
      else{
        setLoadingFacebookSignIn(true)
      }
    await signIn(provider);
    }catch(error){
      toast({
        title:"There was a problem.",
        description:`There was an error logging in with ${provider}`,
        variant:"destructive"
      })
    }finally{
      if(provider==="google"){
        setLoadingGoogleSignIn(false)
      }
      else{
        setLoadingFacebookSignIn(false)
      }
      
    }
  };

  return (
    <>
 
        <div className="flex items-center flex-col justify-center h-[75vh] md:h-[90vh]">
          <div className="bg-white p-5 w-[80%]  md:w-[40%] lg:w-[30%] xl:w-[23%] shadow-lg rounded-lg">
            <h2 className="text-center font-semibold text-lg mb-4">Sign In</h2>

            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                  {...register('email', {
                    required: true,
                  })}
                  disabled={loadingSignIn || loadingFacebookSignIn || loadingGoogleSignIn}
                  placeholder="Email Address"
                  type="text"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
                <PasswordInput
                  disabled={loadingSignIn || loadingFacebookSignIn || loadingGoogleSignIn}
                  name={'password'}
                  register={register('password', { required: true })}
                  placeholder="Password"
                />
                <span className=" text-purple-500 border-purple-500 cursor-pointer border-b -mt-2 w-fit text-sm italic">
                  Forgot Password ?
                </span>
                <Button isLoading={loadingSignIn} variant="outline" className={`border-black flex gap-2 ${loadingSignIn?"bg-black text-white":""}`} type="submit">
                    Confirm
                </Button>
             
              </form>
              <span className="text-center text-lg -my-2 font-semibold">Or</span>
              
              <Button isLoading={loadingGoogleSignIn} className="w-full gap-2 bg-black flex items-center justify-center"  onClick={() => {
                  console.log("clicked")
                handleSignUpWithProvider('google')}}>
                {loadingGoogleSignIn?null:<Icons.google className="h-4"/>}
                Sign In with Google
              </Button>

                <Button isLoading={loadingFacebookSignIn} className="w-full hover:bg-[#1850BC] flex items-center gap-2 justify-center bg-[#1850BC]"  onClick={() => handleSignUpWithProvider('facebook')}>
                {loadingFacebookSignIn?null:<Icons.facebook className="h-3"/>}
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
