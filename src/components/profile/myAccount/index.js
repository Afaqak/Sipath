
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useAxios from '@/hooks/useAxios';
import Link from 'next/link';
import { errorToast, successToast } from '@/utils/toasts';
import { Button } from '@/components/ui/button';




export const InputField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#616161] font-thin">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="placeholder:text-sm py-1 focus:outline-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] px-2 rounded"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};


export const SocialMediaField = ({ label, name, value, onChange, placeholder, color }) => {
  return (
    <div className="flex items-center justify-between w-full ">
      <label className={`text-sm font-thin text-${color}`}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className={`placeholder:text-sm py-1 w-4/5 focus:outline-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] px-2 rounded`}
        placeholder={placeholder}
      />
    </div>
  );
};


export const TextareaField = ({
  label,
  name,
  value,
  register,
  onChange,
  placeholder,
  rows,
  cols,
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-sm text-[#616161] font-thin">{label}</label>
      <textarea
        {...register}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className="placeholder:text-sm py-2 resize-none focus:outline-none shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] px-4 rounded"
        placeholder={placeholder}
      />
    </div>
  );
};






export const MyAccountInfo = ({ setEdit, categories }) => {

  const {
    data: user,
  } = useSession();
  if (!user) {
    return <div>Loading or error message...</div>;
  }

  const expertise = (user?.tutor?.expertise || user?.tutor?.expertise)?.map((exp) => {
    return categories.find(cat => cat?.id === exp)
  })

  const interests = (user?.user?.interests || user?.user?.interests)?.map((int) => {
    return categories.find(cat => cat?.id === int)
  })


  return (
    <div>
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-1 grid  gap-4 lg:w-[25%]">
            <div>
              <label className="text-sm font-thin">First Name</label>
              <h2 className=" text-lg">{user?.user?.first_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Last Name</label>
              <h2 className=" text-lg">{user?.user?.last_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Account Name</label>
              <h2 className=" text-lg">{user?.user?.display_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Email Address</label>
              <h2 className=" text-lg">{user?.user?.email}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Phone Number</label>
              <h2 className=" text-lg">**********12</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Website</label>
              <h2 className="text-lg">www.example.com</h2>
            </div>
          </div>

          <div className="lg:w-1/3 grid grid-cols-3 lg:grid-cols-1 border-l border-[#D9D9D9] pl-6 md:pl-10 gap-6">
            {
              user?.tutor?.hourly_rate && user?.tutor?.hourly_rate > 0 &&
              <div className="">

                < label className="text-sm font-thin">Hourly Rate</label>
                <h2 className=" text-lg">{user?.tutor?.hourly_rate}$</h2>

              </div>
            }
            {
              user?.tutor &&
              <div>
                <label className="text-sm font-thin">Expertise</label>
                <ul className=" list-disc">
                  {
                    expertise?.map((exp,ind) => (
                      <li key={ind}>
                        {exp?.category}
                      </li>
                    ))
                  }

                </ul>
              </div>
            }
            <div>
              <label className="text-sm font-thin">Interests</label>
              <ul className=" list-disc">
                {
                  interests?.map((int,ind) => (
                    <li key={ind}>
                      {int?.category}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 border-l border-[#D9D9D9] pl-6 md:pl-10 lg:w-2/5 ">
            <div>
              <label className="text-sm font-thin">Bio</label>
              <p className="text-lg">{user?.user?.bio}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#CF47FF]">Instagram</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-main">Twitter</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-main">Facebook</h2>
                  <p className="text-center">__</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/notlinked.svg'} width={15} height={15} alt="linked" /> Not
                  Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#203A60]">LinkedIn</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end flex-grow">
              <Button
                variant="outline"
                onClick={() => setEdit(true)}
                className="border-subcolor text-subcolor font-medium"
              >
                Edit Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};




export const MyAccount = ({ session }) => {
  const axios = useAxios();
  const [interests, setInterests] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const { data: user, update } = useSession();
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([])
  console.log(user)




  const [formData, setFormData] = useState({
    firstName: user?.user?.first_name || '',
    lastName: user?.user?.last_name || '',
    displayName: user?.user?.display_name || '',
    emailAddress: user?.user?.email || '',
    phoneNumber: '',
    website: '',
    hourlyRate: user?.tutor?.hourly_rate || 0,
    bio: user?.user?.bio || '',
    instagram: '',
    twitter: '',
    facebook: '',
    linkedIn: '',
  });

  const handleExpertise = (experty) => {
    const expertiseIndex = expertise.findIndex((exp) => exp.id === experty.id);

    if (expertiseIndex === -1) {
      setExpertise([...expertise, { id: experty.id, experty: experty.category }]);
    } else {
      const updatedExpertise = [...expertise];
      updatedExpertise.splice(expertiseIndex, 1);
      setExpertise(updatedExpertise);
    }
  };
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



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const formFields = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        display_name: formData.displayName,
        bio: formData.bio,
        email: formData.emailAddress,
      };


      let hasUserData = false;

      for (const field in formFields) {
        if (formFields[field]) {
          formDataToSend.append(field, formFields[field]);
          hasUserData = true;
        }
      }

      if (interests.length > 0) {
        const updatedInterests = interests?.map(exp => exp?.id)

        for (var i = 0; i < interests.length; i++) {
          formDataToSend.append('interests[]', updatedInterests[i]);
        }
      }
      // console.log(session)
      // console.log(formDataToSend.get('interests'),"{interests}")

      if (hasUserData) {
        const userResponse = await axios.patch('/users/profile', formDataToSend, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const newSession = {
          ...user,
          user: {
            user: { ...userResponse.data?.user },

          },

        };

        session.user = userResponse.data?.user

        if (
          user?.user?.isTutor && (formData.hourlyRate || (expertise && expertise?.length > 0))
        ) {
          const tutorData = {}
          if (formData.hourlyRate) {
            tutorData.hourly_rate = formData.hourlyRate
          }
          if (expertise.length > 0) {
            tutorData.expertise = expertise?.map(exp => exp?.id)
          }

          const tutorResponse = await axios.patch(
            '/users/profile/tutor',
            tutorData,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );

          newSession.user.tutor = {
            ...user.tutor,
            ...tutorResponse.data.tutor,
          };
          session.tutor = tutorResponse.data.tutor

        }

        await update(newSession);

        successToast('Profile Updated!');
      } else {
        errorToast('No data to update.');
      }
    } catch (err) {
      errorToast('Error Updating Profile!');
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories')
        setCategories(response?.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()
  }, [])


  return (
    <div>
      {!edit ? (
        <MyAccountInfo setEdit={setEdit} categories={categories} />
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col mt-8">
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
                label="Display Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Display Name"
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
              {user && user?.user.isTutor && (
                <InputField
                  label="Hourly Rate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  placeholder="Hourly Rate"
                />
              )}
              <div className="flex flex-col gap-10 ">
                {user && user?.user?.isTutor && (

                  <div className="flex flex-col">
                    <div className="flex gap-1 relative">
                      <label className="text-[#616161] font-thin text-sm">UPDATE EXPERTISE</label>


                    </div>
                    <div className=" flex gap-1 flex-wrap mt-1 w-[80%]">
                      {categories.map((item, ind) => (
                        <span
                          key={ind}
                          onClick={() => handleExpertise(item, ind)}
                          className={`flex gap-1 rounded-lg px-2 py-[0.15rem] text-sm items-center cursor-pointer border ${expertise.some((exp) => +exp.id === +item.id) ? 'bg-[#D9D9D9]  text-black' : ''
                            }`}
                        >
                          {item.category}{' '}
                        </span>
                      ))}
                    </div>
                  </div>

                )}

                <div className="flex flex-col">
                  <div className="flex gap-1 relative">
                    <label className="text-[#616161] font-thin text-sm">UPDATE INTERESTS</label>


                  </div>
                  <div className=" flex gap-1 flex-wrap mt-1 w-[80%]">
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
            {
              !session?.user?.isTutor &&

              <Link href={"/on-boarding/expert"} className='px-6 text-main py-1 border-main rounded-md border-2 shadow-md'>
                Become an Expert!
              </Link>
            }
            <button
              type="submit"
              className="px-6 py-1 border-subcolor text-subcolor rounded-md border-2 shadow-md"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="px-6 py-1 border-subcolor2 text-subcolor2 border-2 rounded-md shadow-md"
            >
              Cancel
            </button>

          </div>
        </form>
      )}

    </div>
  );
};
