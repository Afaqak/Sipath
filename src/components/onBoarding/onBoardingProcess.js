'use client';
import React, { useState, useRef, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Modal } from '@/components';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export const OnBoardingProcess = () => {
  const { data: user, update } = useSession();
  const axios = useAxiosPrivate();
  const router = useRouter();
  const fileRef = useRef();
  const [interests, setInterests] = useState([]);
  const [modelOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [buttonType, setButtonType] = useState('');

  const handleContinueAsUser = () => {
    setButtonType('asUser');
  };

  const handleContinueAsExpert = () => {
    setButtonType('asExpert');
  };

  const handleModalSubmit = (val) => {
    setInterests([...interests, val]);
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const interests = [1, 2, 3, 4];

    const formData = new FormData();

    formData.append('first_name', data.firstName);
    formData.append('middle_name', data.middleName);
    formData.append('last_name', data.lastName);
    formData.append('date_of_birth', data.birthday);
    formData.append('bio', data.bio);
    formData.append('display_name', data.displayName);
    formData.append('profile_image', selectedImage);
    for (var i = 0; i < interests.length; i++) {
      formData.append('interests[]', interests[i]);
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

    const response = await axios.post('onboard/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.token}`,
      },
    });
    console.log(response.data, 'onboard');
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
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const image = new Image();
    console.log(file.type);
    if (file.type.startsWith('image/')) {
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width <= 140 && image.height <= 140) {
          setSelectedImage(file);
          console.log(image.width, image.height);
        } else {
          errorToast('Image must be of size 140x140');
        }
      };
    } else {
      errorToast('Please upload an image file.');
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[70%] bg-white w-[70%] flex flex-col justify-between mx-auto relative rounded-md shadow-md p-5"
        >
          <div className="">
            <h1 className="text-xl mb-4 font-semibold">Create Your Profile</h1>
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3">
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
                  <div className="mt-4 flex flex-col gap-2">
                    <label className="font-thin mb-1 uppercase text-sm">Date of Birth</label>
                    <Controller
                      name="birthday"
                      control={control}
                      rules={{ required: 'Birthday is required' }}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd-MM-yyyy"
                          customInput={<CustomInput ref={fileRef} />}
                          popperPlacement="bottom"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                        />
                      )}
                    />
                    {errors.birthday && (
                      <span className="text-red-500 text-sm lowercase mb-1">
                        {errors.birthday.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex gap-2 flex-col">
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
                    <img
                      onClick={() => setModalOpen(true)}
                      src={'/svgs/add_box.svg'}
                      className="cursor-pointer"
                      alt="add Interest"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {interests.map((item, ind) => (
                      <span
                        className="flex gap-1 bg-[#D9D9D9] px-2 py-[0.15rem] text-sm rounded-lg items-center"
                        key={ind}
                      >
                        <img
                          src={'/svgs/close.svg'}
                          width={15}
                          height={15}
                          alt="close"
                          className="cursor-pointer self-end"
                        />
                        {item}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex flex-col gap-16">
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
                        className="h-20 w-20 rounded-full"
                      />
                    ) : (
                      <img
                        src={'/svgs/accountcircle.svg'}
                        className="h-20 w-20"
                        width={60}
                        height={60}
                        alt="account"
                      />
                    )}
                    <p className="w-1/2 text-[0.78rem] text-[#616161]">
                      File must be min. 140x140px
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                    className="bg-subcolor mt-4 text-white py-1 px-3"
                  >
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
          <div className="w-full flex gap-2 ">
            <button
              onClick={handleContinueAsUser}
              type="submit"
              className="text-main w-full py-1 text-center border-2 border-main font-medium rounded-md"
            >
              Continue As User
            </button>
            <button
              onClick={handleContinueAsExpert}
              type="submit"
              className="text-black text-center py-1 w-full border-2 border-black font-medium rounded-md"
            >
              Continue as an Expert
            </button>
          </div>
        </form>
        <Modal
          isOpen={modelOpen}
          onClose={() => setModalOpen(false)}
          handleModalSubmit={handleModalSubmit}
          modalType={'Interests'}
        />
      </div>
    </>
  );
};

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] flex justify-between items-center rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
    onClick={onClick}
  >
    {value ? (
      <span className="">{value}</span>
    ) : (
      <label className="text-gray-400 uppercase text-sm">Select Birthdate</label>
    )}
    <span className="ml-2 mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 00-.707 1.707l3.182 3.182H3a1 1 0 100 2h9.475l-3.182 3.182a1 1 0 101.414 1.414l5.001-5a1.002 1.002 0 000-1.414l-5-5A1 1 0 0010 2z"
          clipRule="evenodd"
        />
      </svg>
    </span>
    <input ref={ref} type="text" style={{ display: 'none' }} />
  </div>
));
