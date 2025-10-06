import { RiEyeCloseLine } from 'react-icons/ri';
import { RiEyeLine } from 'react-icons/ri';
import useToggle from '../../hooks/useToggle';
import {  useNavigate } from 'react-router-dom';
import useFormChangeHandler from '../../hooks/useFormChangeHandler';
import { useSignIn } from './hooks/useAuth';
import Loader from '../../components/ui/Loader';
import { showError, showSuccess } from '../../utils/toast';

import { useQueryClient } from '@tanstack/react-query';
import { getOverview } from '../../services/dashboardApi/dashboardServices';
const Login = () => {
  const [isPasswordVisible, togglePassword] = useToggle();
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [formData, setFormData] = useFormChangeHandler({
    email: '',
    password: ''
  });
 
 

  const { mutate: signIn, isPending } = useSignIn();
 
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    signIn(formData, {
      onSuccess: async (data: any) => {
        showSuccess(data.message || 'Login Successful');

        await queryClient.prefetchQuery({
          queryKey: ["getOverview"],
          queryFn: getOverview
          
        })

        navigate('/home');

      },
      onError: (err: any) => {
        showError(err.message);
      }
    });
  };
  return (
    <div
      className="lg:h-screen w-full bg-cover bg-center "
      style={{ backgroundImage: "url('/images/login.png')", backgroundColor: 'black' }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black/40 py-30 ">
        <div className="lg:w-[43%] w-[90%]  lg:h-auto flex flex-col items-center bg-white py-14 px-5 rounded-xl shadow-lg">
          <img className="w-[240px]" src="/logo.svg" alt="Logo" />
          <div>
            <h2 className="font-extrabold text-center text-[#2D403D] text-2xl uppercase mt-5 mb-9">
              44 Nigerian Army Reference Hospital
            </h2>
            <h2 className="font-extrabold text-[#22A08E] text-3xl  text-center mb-9">
              Welcome Back!
            </h2>
          </div>
          <form onSubmit={handleSignUp} className="w-[85%] flex flex-col">
            <label className="text-sm uppercase font-semibold mb-1.5" htmlFor="Email">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter Email Address"
              className="h-12 border-1 border-[#B1B8B7] rounded-sm px-2.5"
              value={formData.email}
              onChange={setFormData}
              type="text"
            />
            <label className="text-sm uppercase font-semibold mt-10 mb-1.5" htmlFor="Email">
              Password
            </label>
            <div className="w-full relative h-12">
              <input
                placeholder="Enter Password"
                className="h-12 w-full border-1 border-[#B1B8B7] absolute px-2.5 rounded-sm"
                name="password"
                value={formData.password}
                onChange={setFormData}
                type={isPasswordVisible ? 'text' : 'password'}
              />
              <button
                className="absolute top-3 right-5"
                onClick={(e) => {
                  e.preventDefault();
                  togglePassword();
                }}
              >
                {isPasswordVisible ? (
                  <RiEyeLine className="text-2xl" />
                ) : (
                  <RiEyeCloseLine className="text-2xl" />
                )}
              </button>
            </div>

            <button
              className="cursor-pointer flex justify-center items-center w-full h-15 mt-20 rounded-sm bg-[#22A08E] text-white"
              type="submit"
            >
              {isPending ? <Loader /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
