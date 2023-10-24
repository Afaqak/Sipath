import toast from 'react-hot-toast';
export const errorToast = (text, color = '#fb3c22') =>
  toast.error(text, {
    style: {
      backgroundColor: color,
      borderRadius: '30px',
      color: 'white',
    },
    icon: '⚪',
  });

export const successToast = (text, color = '#1850BC') =>
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
