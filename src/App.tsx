import { useLocation } from 'react-router';
import Rout from './components/router/Rout';
import './global.css';

import Header from './components/Header';
import Navigation from './components/Navigation';
import { useContext} from 'react';
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
import Providers from './provider/providers';
import { Toaster } from 'react-hot-toast';
import SickModal from './components/SickReport/SickModal';
import UnitHoldingModal from './components/UnitHolding/UnitHoldingModal';


const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    showAddRecordModal,
    showDutyReportModal,
    showSickModal,
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
    showAdminDetails,
    showUnitHoldingModal
  } = useContext(AppContext);

  
  return (
    <div className="flex items-start h-screen overflow-hidden overflow-y-auto">
      <Providers>
        <>
          {currentPath !== '/login' && currentPath !== '/' && <Navigation />}

          {showAddRecordModal && <AddRecordModal />}
          {showSickModal && <SickModal />}
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
          {showUnitHoldingModal && <UnitHoldingModal />}
          {showAdminDetails && <AdminDetails />}

          <div
            className={`overflow-hidden h-[100vh] overflow-y-auto ${
              currentPath !== '/login' && '' ? 'w-full lg:w-[95%]' : 'w-full'
            } `}
          >
            {currentPath !== '/login' && '' && <Header />}

            <Rout />
          </div>
        </>
      </Providers>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff'
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff'
            }
          },
          error: {
            style: {
              background: '#f87171',
              color: '#fff'
            }
          }
        }}
      />
    </div>
  );
};

export default App;
