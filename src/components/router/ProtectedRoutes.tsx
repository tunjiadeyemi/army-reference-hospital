import { Navigate, Outlet} from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore/useAuthStore';

import Cookies from 'js-cookie';





const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token) || Cookies.get("accessToken");
 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
};

export default ProtectedRoute;
