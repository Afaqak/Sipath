import { useEffect } from 'react';

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current) {
        const isOutsideClick = !ref.current.contains(event.target);
        const isNotTimePicker =
          !event.target.className || (typeof event.target.className === 'string' && !event.target.className.includes('rc-time-picker'));
        const isNotDatePicker =
          !event.target.className || (typeof event.target.className === 'string' && !event.target.className.includes('react-datepicker'));
        

        if (isOutsideClick && isNotTimePicker && isNotDatePicker) {
          callback();
        }
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [ref, callback]);
};



