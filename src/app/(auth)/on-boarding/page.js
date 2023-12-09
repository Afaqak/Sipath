'use client';
import React, { useState, useRef, forwardRef, useEffect } from 'react';

import { Icons } from '@/components';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Button } from '@/components/ui/button';
import axios from '@/utils/index'

const OnBoardingPage = () => {
  const { data: user, update } = useSession();
  const privateAxios = useAxiosPrivate();
  const router = useRouter();
  const fileRef = useRef();
  const [interests, setInterests] = useState([]);

  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [buttonType, setButtonType] = useState('');
  const [loadingAsUser, setLoadingAsUser] = useState(false);
  const [loadingAsExpert, setLoadingAsExpert] = useState(false);

  const handleContinueAsUser = () => {
    setButtonType('asUser');
  };

  const handleContinueAsExpert = () => {
    setButtonType('asExpert');
  };



  const onSubmit = async (data) => {

    if (buttonType === "asUser") {
      setLoadingAsUser(true)
    } else {
      setLoadingAsExpert(true)
    }
    const formData = new FormData();

    formData.append('first_name', data.firstName);
    formData.append('middle_name', data.middleName);
    formData.append('last_name', data.lastName);
    formData.append('date_of_birth', data.birthday);
    formData.append('bio', data.bio);
    formData.append('display_name', data.displayName);
    formData.append('profile_image', selectedImage);
    if (interests.length > 0) {
      const updatedInterests = interests?.map(exp => exp?.id)
      for (var i = 0; i < interests.length; i++) {
        formData.append('interests[]', updatedInterests[i]);
      }
    }

    function onSuccess() {
      if (buttonType === 'asUser') {
        successToast('Profile Created!');

        router.push('/');

      } else {
        successToast('Profile Created!\nTime to become an expert!');
        router.push('/on-boarding/expert');


      }
    }
    try {
      const response = await privateAxios.post('onboard/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data) {
        const newSession = {
          ...user,
          user: {
            ...user.user,
            user: response.data?.user,
          },
        };
        await update(newSession);
        onSuccess();
      }

    } catch (err) {
      console.log(err)
    }
    finally {
      setLoadingAsExpert(false)
      setLoadingAsUser(false)
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const image = new Image();

    if (file.type.startsWith('image/')) {
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        setSelectedImage(file);
      };
    } else {
      errorToast('Please upload an image file.');
    }

  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories')
        setCategories(response?.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()
  }, [])
  const handleInterests = (interest) => {
    const InterestIndex = interests.findIndex((int) => int.id === interest.id);

    if (InterestIndex === -1) {
      setInterests([...interests, { id: interest.id, experty: interest.category }]);
    } else {

      const updatedInterest = [...interests];
      updatedInterest.splice(InterestIndex, 1);
      setInterests(updatedInterest)
    }
  };

  return (
    <>
      <div className="h-full  flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[70%] lg:mt-[5%] mt-0 bg-white w-[90%] lg:w-[70%] flex flex-col justify-between mx-auto relative rounded-md shadow-md p-5"
        >
          <div className="">
            <h1 className="text-[1.15rem] mb-4 font-semibold">Create Your Profile!</h1>
            <div className="flex lg:flex-row flex-col gap-4">
              <div className="flex flex-col lg:">
                <label className="font-thin mb-1 uppercase text-sm">Personal Information</label>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <input
                      {...register('firstName', { required: 'first name is required' })}
                      placeholder="First Name"
                      type="text"
                      className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
                      name="firstName"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm mt-1 lowercase">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      {...register('middleName', { required: 'middle name is required' })}
                      placeholder="Middle Name"
                      type="text"
                      className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
                      name="middleName"
                    />
                    {errors.middleName && (
                      <span className="text-red-500 text-sm mt-1 lowercase">
                        {errors.middleName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      {...register('lastName', { required: 'last name is required' })}
                      placeholder="Last Name"
                      type="text"
                      className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
                      name="lastName"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm mt-1 lowercase">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col gap-2 ">
                    <label className="font-thin mb-1 uppercase text-sm">Date of Birth</label>


                    <input  {...register('birthday', { required: 'birthday is required' })} type='date' placeholder='Date of birth' className='placeholder:text-sm py-2 resize-none cursor-pointer focus:outline-none shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] px-4 rounded' />

                    {errors.birthday && (
                      <span className="text-red-500 text-sm lowercase mb-1">
                        {errors.birthday.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <div className="flex flex-col gap-1 ">
                  <label className="text-sm text-[#616161] font-thin">Bio</label>
                  <textarea
                    {...register('bio', {
                      required: 'bio is required',
                    })}
                    name={'bio'}
                    rows={4}
                    cols={4}
                    className="placeholder:text-sm py-2 resize-none focus:outline-none shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] px-4 rounded"
                    placeholder={'Bio'}
                  />
                  {errors.bio && (
                    <span className="text-red-500 text-sm mt-1 lowercase">
                      {errors.bio.message}
                    </span>
                  )}
                </div>

                <div className="mt-7">
                  <div className="flex gap-1 mb-2">
                    <label className="text-sm text-[#616161] font-thin">INTERESTS</label>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {categories.map((item, ind) => (
                      <span
                        key={ind}
                        onClick={() => handleInterests(item, ind)}
                        className={`flex gap-1 rounded-lg px-2 py-[0.15rem] text-sm items-center cursor-pointer border ${interests.some((exp) => exp.id === item.id) ? 'bg-[#D9D9D9]  text-black' : ''
                          }`}

                      >
                        {item.category}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-16">
                <div>
                  <label className=" font-thin mb-1 uppercase text-sm">Display Name</label>
                  <input
                    {...register('displayName', { required: 'display name is required' })}
                    placeholder="Choose a Display Name"
                    type="text"
                    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] w-full rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
                    name="displayName"
                  />
                  {errors.displayName && (
                    <span className="text-red-500 text-sm mt-1 lowercase">
                      {errors.displayName.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-end gap-4">
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="account"
                        className="h-20 w-20 rounded-full object-contain"
                      />
                    ) : (
                      <Icons.account_circle className="fill-[#1C1B1F] w-20 h-20" />
                    )}

                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    className="bg-subcolor mt-4 rounded-md flex items-center gap-2 text-white py-1 px-3"
                  >
                    <Icons.upload className=" fill-white w-4 h-4 text-white" />
                    Upload Image
                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-2 mt-4">
            <Button
              onClick={handleContinueAsUser}
              type="submit"
              variant="outline"
              disabled={loadingAsExpert || loadingAsUser}
              className="text-main w-full py-1 flex gap-2 border-main"
            >
              {loadingAsUser && <span className='w-4 h-4 animate-spin'><Icons.Loader2 stroke="#1850BC" className="w-4 h-4" /></span>}
              Continue As User
            </Button>
            <Button
              onClick={handleContinueAsExpert}
              type="submit"
              disabled={loadingAsExpert || loadingAsUser}
              variant="outline"
              className="text-black py-1 w-full flex items-center gap-2 border-black"
            >
              {loadingAsExpert && <span className='w-4 h-4 animate-spin'><Icons.Loader2 stroke="black" className="w-4 h-4" /></span>}
              Continue as an Expert <Icons.info_black className="h-4 w-4 fill-black" />
            </Button>
          </div>
        </form>

      </div>
    </>
  );
};


export default OnBoardingPage