import toast from 'react-hot-toast';
export const errorToast = (text, color = '#fb3c22') =>
  toast.error(text, {
    style: {
      backgroundColor: color,
      color: 'white',
    },
    icon: '⚪',
  });

export const successToast = (text, color) =>
  toast.success(text, {
    style: {
      color: 'white',
      borderRadius: '30px',
      background: color,
    },
    iconTheme: {
      color: 'white',
    },
    icon: '⚪',
  });
