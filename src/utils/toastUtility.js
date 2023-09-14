import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Toast';

const showToastSuccess = (icon, message, router, setLoading = false, route) => {
  const onClose = () => {
    if (setLoading && typeof setLoading === 'function') {
      setLoading(false);
    }

    if (router) {
      router.push(route);
    }
  };

  toast.success(<Toast icon={icon} message={message} />, {
    onClose,
    autoClose: 2000,
    icon: false,
  });
};

const showToastReject = (icon, message, seconds = 2000, setLoading = false) => {
  const onClose = () => {
    if (setLoading && typeof setLoading === 'function') {
      setLoading(false);
    }
  };

  toast.error(<Toast icon={icon} message={message} />, {
    onClose,
    autoClose: seconds,
    icon: false,
  });
};

export const showSuccessToast = (router, setLoading = false, message = 'Logged In 👌', route) => {
  showToastSuccess('🟢', message, router, setLoading, route);
};

export const showErrorToast = (setLoading = false, message = 'Login Rejected 🤯') => {
  console.log('er');
  showToastReject('❌', message, 2000, setLoading);
};

export const showImageErrorToast = () => {
  showToastReject('❌', 'Image size must be 140x140.', 2000);
};
