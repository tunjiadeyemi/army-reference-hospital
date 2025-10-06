import toast from "react-hot-toast";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string) => {
  return toast.loading(message, { duration: 2000 }); 
};

export const dismissToast = (id?: string) => {
  toast.dismiss(id);
};
