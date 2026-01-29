import { RiEyeCloseLine } from 'react-icons/ri';
import { RiEyeLine } from 'react-icons/ri';
import useToggle from '../../hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import useFormChangeHandler from '../../hooks/useFormChangeHandler';
import { useSignIn } from './hooks/useAuth';
import Loader from '../../components/ui/Loader';
import { showError, showSuccess } from '../../utils/toast';

import { useQueryClient } from '@tanstack/react-query';
import { getOverview, prefetchAllData } from '../../services/dashboardApi/dashboardServices';
const Login = () => {
  const [isPasswordVisible, togglePassword] = useToggle();
  const queryClient = useQueryClient();
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
          queryKey: ['getOverview'],
          queryFn: getOverview
        });

        // Prefetch all data immediately after login
        await prefetchAllData();

        navigate('/home');
      },
      onError: (err: any) => {
        showError(err.message);
      }
    });
  };
  return (
    <div
      className="h-screen overflow-y-auto w-full bg-cover bg-center "
      style={{ backgroundImage: "url('/images/login.png')", backgroundColor: 'black' }}
    >
      <div className="flex items-center justify-center w-full h-full overflow-y-auto bg-black/40 py-30 ">
        <div className="my-3 lg:w-[43%] w-[90%] h-auto flex flex-col items-center  bg-white py-7  sm:px-5 rounded-xl shadow-lg">
          <img className="2xl:w-60 w-30 sm:w-40 " src="/logo.svg" alt="Logo" />
          <div className="px-5 w-full ">
            <h2 className="font-extrabold  text-center text-[#2D403D] text-xl md:text-2xl uppercase md:mt-5 mb-4.5 lg:mb-9">
              44 Nigerian Army Reference Hospital
            </h2>
            <h2 className="font-extrabold text-[#22A08E] text-2xl md:text-3xl  text-center mb-4.5 lg:mb-9">
              Welcome Back!
            </h2>
          </div>
          <form onSubmit={handleSignUp} className="w-[85%] flex flex-col gap-0">
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
            <label className="text-sm uppercase font-semibold mt-5 md:mt-10 mb-1.5" htmlFor="Email">
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
              className="cursor-pointer flex justify-center items-center w-full lg:h-15 h-10 mt-5 lg:mt-20 rounded-sm bg-[#22A08E] text-white"
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
