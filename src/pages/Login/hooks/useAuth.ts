import { useMutation } from '@tanstack/react-query';
import { signInApi } from '../../../services/auth/authServices';
import Cookies from 'js-cookie';
import type { signInType } from '../../../services/auth/types/auth.types';
import { useAuthStore } from '../../../store/AuthStore/useAuthStore';


export const useSignIn = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (payload: signInType) => signInApi(payload),
    mutationKey: ["signIn"],
    onSuccess: (data: any) => {
      Cookies.set("accessToken", data.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

  
      setToken(data.token);
    },
  });
};