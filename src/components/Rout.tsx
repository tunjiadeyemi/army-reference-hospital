import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import DepartmentFile from '../pages/DepartmentFile';
import DutyReport from '../pages/DutyReport';
import UnitBible from '../pages/UnitBible';
import Order from '../pages/Order';
import SickReport from '../pages/SickReport';
import Leave from '../pages/Leave';
import Trial from '../pages/Trial';
import Discipline from '../pages/Discipline';
import Signal from '../pages/Signal';
import Guard from '../pages/Guard';
import Staff from '../pages/Staff';
import Mail from '../pages/Mail';
import Accommodation from '../pages/Accomodation';
import Mammy from '../pages/Mammy';
import Library from '../pages/Library';
import Equipment from '../pages/Equipment';
import Vehicle from '../pages/Vehicle';
import Unit from '../pages/Unit';
import User from '../pages/User';

const Rout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
    </Routes>
  );
};

export default Rout;
