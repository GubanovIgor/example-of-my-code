import React from 'react';
import {
  toast,
  ToastOptions,
  ToastPosition,
} from '@backpackapp-io/react-native-toast';
import { Toast } from 'components/Toast';

export const showToast = (
  message: string,
  isError?: boolean,
  options?: ToastOptions,
) => {
  toast(message, {
    position: ToastPosition.BOTTOM,
    ...options,
    customToast: (toastData) => <Toast isError={isError} toast={toastData} />,
  });
};
