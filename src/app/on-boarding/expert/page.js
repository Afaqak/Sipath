'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, AvailableDays } from '@/components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useOutsideClick } from '@/hooks/useOutsideClick';
const OnBoardingExpert = () => {
  const { data: user, update } = useSession();
  const axios = useAxiosPrivate();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [expertise, setExpertise] = useState([])
  const [availability, setAvailability] = useState([]);
  console.log(expertise)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories');
        console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);



  const onSuccess = () => {
    successToast('Congratulations! You are a tutor now.');
    setLoading(false);
    router.push('/');
  };

  const handleExpertise = (experty, index) => {
    const expertiseIndex = expertise.findIndex((exp) => exp.id === experty.id);

    if (expertiseIndex === -1) {
      setExpertise([...expertise, { id: experty.id, experty: experty.category }]);
    } else {

      const updatedExpertise = [...expertise];
      updatedExpertise.splice(expertiseIndex, 1);
      setExpertise(updatedExpertise);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hourlyRate) return;
    try {
      setLoading(true);
      const formData = {
        hourly_rate: hourlyRate,
        expertise: expertise?.map(exp => exp?.id),
        availability,
      };

      const response = await axios.post('/onboard/tutor', formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data) {
        console.log(response.data, 'expert');
        const newSession = {
          ...user,
          user: {
            ...user.user,
            user: { isTutor: true, ...response.data },
          },
        };
        await update(newSession);
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[90vh] my-2 items-center justify-center flex">
        <form
          onSubmit={handleSubmit}
          className="p-7 min-h-[70vh] rounded-lg shadow-lg bg-white w-[70%] flex flex-col gap-2"
        >
          <h1 className="font-semibold text-lg">Complete Your Profile!</h1>
          <div>
            <div className="flex gap-2 ">
              <div className="flex flex-col w-fit">
                <label className="font-thin mb-1 uppercase text-sm">HOURLY RATE</label>
                <input
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Enter Amount"
                  type="text"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-2 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="hourlyRate"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 relative">
                  <label className="text-[#616161] font-thin text-sm">SELECT EXPERTISE</label>


                </div>
                <div className=" flex gap-1 flex-wrap mt-1 w-[65%]">
                  {categories.map((item, ind) => (
                    <span
                      onClick={() => handleExpertise(item, ind)} 
                      className={`flex gap-1 rounded-lg px-2 py-[0.15rem] text-sm items-center cursor-pointer border ${expertise.some((exp) => exp.id === item.id) ? 'bg-[#D9D9D9]  text-black' : ''
                        }`}
                    >
                      {item.category}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 ">
              <h2 className="text-[#616161] font-thin">Availability</h2>
              <AvailableDays setAvailability={setAvailability} />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center rounded-md px-8 py-1 gap-2 ${loading ? 'bg-black text-white' : 'border-2 border-black text-black'
                }`}
            >
              Complete
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default OnBoardingExpert;


export const MultipleExpertiseModal = ({ isOpen, onClose, setExpertise, expertise }) => {
  const axios = useAxiosPrivate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories');
        console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <ul
        className={`transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} absolute top-4 left-0 options grid grid-cols-2 z-10 mt-2 w-56 bg-white border border-gray-300  rounded-md shadow-md`}
      >
        {categories.map((option) => (
          <li
            onClick={() => {
              const expertiseId = option?.id;
              const expertiseCategory = option?.category;
              const isExpertiseSelected = expertise.some((exp) => exp.id === expertiseId);

              if (!isExpertiseSelected) {
                setExpertise([...expertise, { id: expertiseId, experty: expertiseCategory }]);
              }
            }}
            key={option.id}
            className={`py-2 px-4 selectedSubject cursor-pointer shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] ${expertise.some((exp) => exp.id === option.id) ? 'bg-main text-white' : ''
              }`}
          >
            {option.category}
          </li>
        ))}
      </ul>
    </div>
  );
};



// export const ExpertiseModal = ({ isOpen, onClose, handleModalSubmit, modalType }) => {
//   const [selectedOption, setSelectedOption] = useState(null); // Initialize selectedOption as null
//   const [categories, setCategories] = useState([]);
//   const ref = useRef()

//   const axios = useAxiosPrivate();
//   useOutsideClick(ref, onClose)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ id: selectedOption.id, value: selectedOption.category })
//     handleModalSubmit({ id: selectedOption.id, value: selectedOption.category });

//   };

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get('/categories');
//         setCategories(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const handleCategorySelect = (event) => {
//     setSelectedOption(event);
//   };

//   return (
//     <>
//       <div
//         className={`fixed inset-0 overflow-y-auto z-[100000] transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//           }`}
//       >
//         <div className="flex items-center justify-center h-screen relative pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <div className="fixed inset-0 transition-opacity">
//             <div className="absolute inset-0 bg-gray-100" />
//           </div>

//           <form ref={ref} onSubmit={handleSubmit} className={`inline-block z-[5000] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 align-bottom bg-white rounded-lg p-4 text-left shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full ${isOpen ? 'scale-100' : 'scale-90'
//             }`}>
//             <h2 className="text-lg font-semibold mb-8 text-center text-black">{modalType}</h2>
//             <CustomSelect
//               options={categories}
//               selectedOption={selectedOption}
//               onOptionSelect={handleCategorySelect}
//             />

//             <div className="flex justify-end mt-4">
//               <button
//                 className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
//                 type="button"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-1 ml-2 text-sm font-medium bg-main text-white bg-primary rounded-md hover-bg-primary-dark"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };


// const MultiSelectExpertise = ({ availableExpertise, selectedExpertise, onExpertiseSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSelect = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleExpertiseSelect = (expertise) => {
//     const isSelected = selectedExpertise.includes(expertise);

//     if (isSelected) {
//       // Deselect expertise
//       const updatedExpertise = selectedExpertise.filter((item) => item !== expertise);
//       onExpertiseSelect(updatedExpertise);
//     } else {
//       // Select expertise
//       onExpertiseSelect([...selectedExpertise, expertise]);
//     }
//   };

//   return (
//     <div className="multi-select-expertise">
//       <div className="selected-expertise" onClick={toggleSelect}>
//         {selectedExpertise.length > 0
//           ? selectedExpertise.join(', ')
//           : 'Select expertise'}
//       </div>
//       {isOpen && (
//         <ul className="expertise-options">
//           {availableExpertise.map((expertise) => (
//             <li
//               key={expertise.id}
//               onClick={() => handleExpertiseSelect(expertise)}
//               className={selectedExpertise.includes(expertise) ? 'selected' : ''}
//             >
//               {expertise}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };



// const CustomSelect = ({ options, selectedOption, onOptionSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   console.log(options, "P[")

//   const toggleSelect = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionSelect = (option) => {
//     onOptionSelect(option);
//     toggleSelect();
//   };
//   console.log()

//   return (
//     <div className="relative selectedSubject inline-block text-left text-sm">
//       <div className="custom-select relative inline-block">
//         <div
//           className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] cursor-pointer rounded-md px-4 py-2"
//           onClick={toggleSelect}
//         >
//           {selectedOption ? selectedOption.category : 'Select an option'}
//         </div>
//         {isOpen && (
//           <ul className="options absolute grid grid-cols-2 z-10 mt-2 w-56 bg-white border border-gray-300  rounded-md shadow-md">
//             {options.map((option) => (
//               <li
//                 key={option.id}
//                 onClick={() => handleOptionSelect(option)}
//                 className={`py-2 px-4 selectedSubject cursor-pointer shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)]   ${selectedOption === option
//                   ? 'bg-main text-white'
//                   : 'bg-white text-black hover:bg-gray-100'
//                   }`}
//               >
//                 {option.category}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>

//   );
// };
