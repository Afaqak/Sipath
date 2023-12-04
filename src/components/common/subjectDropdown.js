
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState, useRef ,useEffect} from "react";
import axios from '../../utils/index'
export const SubjectDropDown = ({  selectedValue, onValueChange, placeholder="Select Subject"}) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([])

  const ref = useRef(null)
  const toggleDropdown = () => {
   
    setOpen(!open);
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


  useOutsideClick(ref, () => setOpen(false))

  return (
    <div ref={ref}  className="relative subject-dropdown w-48">
      <ul className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)]  py-1 placeholder:text-sm border-none focus:outline-none resize-none rounded-md">
          
        <li className="relative  group cursor-pointer text-sm">
          <span
            className="block leading-5 text-gray-700 px-3"
            onClick={toggleDropdown}
          >
            {selectedValue ? categories?.find((option) => option?.id === selectedValue)?.category : <span className="capitalize text-gray-400">{placeholder}</span>}
          </span>
          {open && (
            <ul className="absolute   border rounded border-gray-300 z-[99999999] bg-white box-shadow-main w-64 py-1 mt-1">
              <li
                className="block py-2 px-2  leading-5 text-gray-700 hover:bg-stone-100 cursor-pointer"
                onClick={() => {
                  toggleDropdown();
                  onValueChange('');
                }}
              >
                {placeholder}
              </li>
              <div className='grid grid-cols-2 divide-x '>
                {categories.map((option) => (
                  <li
                    key={option.id}
                    className="block py-2 px-2 w-full leading-5 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      toggleDropdown();
                      onValueChange(option.id);
                    }}
                  >
                    {option.category}
                  </li>
                ))}
              </div>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};
