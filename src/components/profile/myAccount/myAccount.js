import Image from 'next/image';
import React, { useState } from 'react';
import { SocialMediaField, InputField, Modal, TextareaField, MyAccountInfo } from '@/components';
export const MyAccount = () => {
  const [interests, setInterests] = useState([]);
  const [expertise, setExpertise] = useState([]);
  console.log(interests, expertise);
  const [modalType, setModalType] = useState('');
  const [modelOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accountName: '',
    emailAddress: '',
    phoneNumber: '',
    website: '',
    hourlyRate: '',
    bio: '',
    instagram: '',
    twitter: '',
    facebook: '',
    linkedIn: '',
  });

  const setModalOpenAndType = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalSubmit = (value) => {
    console.log(value);
    if (modalType === 'expertise') {
      setExpertise([...expertise, value]);
    } else if (modalType === 'interests') {
      setInterests([...interests, value]);
    }
    setModalOpen(false);
  };
  console.log(modalType);
  let edit = true;

  return (
    <div>
      {!edit ? (
        <MyAccountInfo />
      ) : (
        <form className="flex gap-4 flex-col mt-8">
          <div className="flex lg:flex-row flex-col gap-8 w-full">
            <div className="flex flex-col gap-4 lg:w-1/3">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />

              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <InputField
                label="Account Name"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                placeholder="Account Name"
              />
              <InputField
                label="Email Address"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="Email Address"
              />

              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <InputField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Website"
              />
            </div>

            <div className="lg:w-1/3 flex flex-col gap-4">
              <InputField
                label="Hourly Rate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="Hourly Rate"
              />
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <label className="text-sm text-[#616161] font-thin">Expertise</label>
                    <Image
                      onClick={() => setModalOpenAndType('expertise')}
                      src={'/svgs/add_box.svg'}
                      className="cursor-pointer"
                      alt="add Interest"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className=" flex gap-1 flex-wrap mt-4">
                    {expertise.map((item, ind) => (
                      <span
                        className="flex gap-1 bg-[#D9D9D9] px-2 py-[0.15rem] text-sm rounded-lg items-center"
                        key={ind}
                      >
                        <Image
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
                <div className="flex  flex-col">
                  <div className="flex gap-1">
                    <label className="text-sm text-[#616161] font-thin">Interests</label>
                    <Image
                      onClick={() => setModalOpenAndType('interests')}
                      src={'/svgs/add_box.svg'}
                      className="cursor-pointer"
                      alt="add Interest"
                      width={20}
                      height={20}
                    />
                  </div>

                  <div className="flex gap-1 mt-4 ">
                    {interests.map((item, ind) => (
                      <span
                        className="flex gap-1 bg-[#D9D9D9] px-2 py-[0.15rem] text-sm rounded-lg items-center"
                        key={ind}
                      >
                        <Image
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
            </div>

            <div className="flex flex-col gap-8 lg:w-2/5">
              <TextareaField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                cols={4}
                placeholder="Bio"
              />
              <div className="flex flex-col gap-1 w-full">
                <SocialMediaField
                  label="Instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  color="#CF47FF"
                  placeholder="Instagram"
                />
                <SocialMediaField
                  label="Twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  color="#1850BC"
                  placeholder="Twitter"
                />
                <SocialMediaField
                  label="Facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  color="#1850BC"
                  placeholder="Facebook"
                />
                <SocialMediaField
                  label="LinkedIn"
                  name="linkedin"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  color="#1850BC"
                  placeholder="LinkedIn"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="px-6 py-1 border-green-800 rounded-md border-2 shadow-md">
              Confirm
            </button>
            <button className="px-6 py-1 border-red-400 border-2 rounded-md shadow-md">
              Cancel
            </button>
          </div>
        </form>
      )}
      <Modal
        isOpen={modelOpen}
        onClose={() => setModalOpen(false)}
        handleModalSubmit={handleModalSubmit}
        modalType={modalType}
      />
    </div>
  );
};
