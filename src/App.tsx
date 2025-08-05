import { useLocation } from 'react-router';
import Rout from './components/Rout';
import './global.css';

import Header from './components/Header';
import Navigation from './components/Navigation';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import AddRecordModal from './components/DepartmentFile/AddRecordModal';
import ViewDutyReportModal from './components/DutyReport/ViewDutyReportModal';
import BiodataModal from './components/UnitBible/BiodataModal';
import RecordModal from './components/Order/RecordModal';
import RecordModalTwo from './components/Order/RecordModalTwo';
import LeaveModal from './components/Leave/LeaveModal';
import TrialModal from './components/Trial/TrialModal';
import DisciplineModal from './components/Discipline/DisciplineModal';
import GuardModal from './components/Guard/GuardModal';
import StaffModal from './components/Staff/StaffModal';
import MailModal from './components/Mail/MailModal';
import AccommodationModal from './components/Accommodation/AccommodationModal';
import MammyModal from './components/Mammy/MammyModal';
import LibraryModal from './components/Library/LibraryModal';
import EquipmentModal from './components/Equipment/EquipmentModal';
import VehicleModal from './components/Vehicle/VehicleModal';
import UnitModal from './components/Unit/UnitModal';
import AdminDetails from './components/User/AdminDetails';

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    showAddRecordModal,
    showDutyReportModal,
    showBiodataModal,
    showRecordModal,
    showRecordModalTwo,
    showLeaveModal,
    showTrialModal,
    showDisciplineModal,
    showGuardModal,
    showStaffModal,
    showMailModal,
    showAccommodationModal,
    showMammyModal,
    showLibraryModal,
    showEquipmentModal,
    showVehicleModal,
    showUnitModal,
    showAdminDetails
  } = useContext(AppContext);

  return (
    <div className="flex items-start h-screen overflow-hidden overflow-y-auto">
      <Navigation />

      {showAddRecordModal && <AddRecordModal />}
      {showDutyReportModal && <ViewDutyReportModal />}
      {showBiodataModal && <BiodataModal />}
      {showRecordModal && <RecordModal />}
      {showRecordModalTwo && <RecordModalTwo />}
      {showLeaveModal && <LeaveModal />}
      {showTrialModal && <TrialModal />}
      {showDisciplineModal && <DisciplineModal />}
      {showGuardModal && <GuardModal />}
      {showStaffModal && <StaffModal />}
      {showMailModal && <MailModal />}
      {showAccommodationModal && <AccommodationModal />}
      {showMammyModal && <MammyModal />}
      {showLibraryModal && <LibraryModal />}
      {showEquipmentModal && <EquipmentModal />}
      {showVehicleModal && <VehicleModal />}
      {showUnitModal && <UnitModal />}
      {showAdminDetails && <AdminDetails />}

      <div
        className={`overflow-hidden h-[100vh] overflow-y-auto ${
          currentPath !== '/login' ? 'w-full lg:w-[95%]' : 'w-[75%]'
        } `}
      >
        {currentPath !== '/login' && <Header />}
        <Rout />
      </div>
    </div>
  );
};

export default App;
