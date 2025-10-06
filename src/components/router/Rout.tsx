import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../../pages/Home'));
const DepartmentFile = lazy(() => import('../../pages/DepartmentFile'));
const DutyReport = lazy(() => import('../../pages/DutyReport'));
const UnitBible = lazy(() => import('../../pages/UnitBible'));
const Order = lazy(() => import('../../pages/Order'));
const SickReport = lazy(() => import('../../pages/SickReport'));
const Leave = lazy(() => import('../../pages/Leave'));
const Trial = lazy(() => import('../../pages/Trial'));
const Discipline = lazy(() => import('../../pages/Discipline'));
const Signal = lazy(() => import('../../pages/Signal'));
const Guard = lazy(() => import('../../pages/Guard'));
const Staff = lazy(() => import('../../pages/Staff'));
const Mail = lazy(() => import('../../pages/Mail'));
const Accommodation = lazy(() => import('../../pages/Accomodation'));
const Mammy = lazy(() => import('../../pages/Mammy'));
const Library = lazy(() => import('../../pages/Library'));
const Equipment = lazy(() => import('../../pages/Equipment'));
const Vehicle = lazy(() => import('../../pages/Vehicle'));
const Unit = lazy(() => import('../../pages/Unit'));
const User = lazy(() => import('../../pages/User'));
const Login = lazy(() => import('../../pages/Login'));
import ProtectedRoute from './ProtectedRoutes';

const Rout = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route index element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/departmentFile/:active?" element={<DepartmentFile />} />
          <Route path="/dutyReport/:active?" element={<DutyReport />} />
          <Route path="/unitBible/:active?" element={<UnitBible />} />
          <Route path="/order/:active?" element={<Order />} />
          <Route path="/sick-report/:active?" element={<SickReport />} />
          <Route path="/leave/:active?" element={<Leave />} />
          <Route path="/trial/:active?" element={<Trial />} />
          <Route path="/discipline/:active?" element={<Discipline />} />
          <Route path="/signal/:active?" element={<Signal />} />
          <Route path="/guard/:active?" element={<Guard />} />
          <Route path="/staff/:active?" element={<Staff />} />
          <Route path="/mail/:active?" element={<Mail />} />
          <Route path="/accommodation/:active?" element={<Accommodation />} />
          <Route path="/mammy/:active?" element={<Mammy />} />
          <Route path="/library/:active?" element={<Library />} />
          <Route path="/equipment/:active?" element={<Equipment />} />
          <Route path="/vehicle/:active?" element={<Vehicle />} />
          <Route path="/unit/:active?" element={<Unit />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Rout;
