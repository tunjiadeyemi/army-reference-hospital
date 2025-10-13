/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import type { MainTableData } from '../utils/types/department';

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  showAddRecordModal: boolean;
  setShowAddRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDepartmentRecord: MainTableData | null;
  setSelectedDepartmentRecord: React.Dispatch<React.SetStateAction<MainTableData | null>>;
  selectedDutyReport: any;
  setSelectedDutyReport: React.Dispatch<React.SetStateAction<any>>;
  showDutyReportModal: boolean;
  setShowDutyReportModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBiodata: any;
  setSelectedBiodata: React.Dispatch<React.SetStateAction<any>>;
  selectedBiodataObj: any;

  showUnitHoldingModal: any;
  setShowUnitHoldingModal: React.Dispatch<React.SetStateAction<any>>;

  setSelectedBiodataObj: React.Dispatch<React.SetStateAction<any>>;
  selectedSickReportObj: any;
  setSelectedSickReportObj: React.Dispatch<React.SetStateAction<any>>;
  showBiodataModal: boolean;
  setShowBiodataModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord: any;
  setSelectedRecord: React.Dispatch<React.SetStateAction<any>>;
  showRecordModal: boolean;
  setShowRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecordTwo: any;
  setSelectedRecordTwo: React.Dispatch<React.SetStateAction<any>>;
  showRecordModalTwo: boolean;
  setShowRecordModalTwo: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSickRecord: any;
  setSelectedSickRecord: React.Dispatch<React.SetStateAction<any>>;
  showSickModal: boolean;
  setShowSickModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLeaveRecord: any;
  setSelectedLeaveRecord: React.Dispatch<React.SetStateAction<any>>;
  showLeaveModal: boolean;
  setShowLeaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTrialRecord: any;
  setSelectedTrialRecord: React.Dispatch<React.SetStateAction<any>>;
  showTrialModal: boolean;
  setShowTrialModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedDisciplineRecord: any;
  setSelectedDisciplineRecord: React.Dispatch<React.SetStateAction<any>>;
  showDisciplineModal: boolean;
  setShowDisciplineModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSignalRecord: any;
  setSelectedSignalRecord: React.Dispatch<React.SetStateAction<any>>;
  showSignalModal: boolean;
  setShowSignalModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGuardRecord: any;
  setSelectedGuardRecord: React.Dispatch<React.SetStateAction<any>>;
  showGuardModal: boolean;
  setShowGuardModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStaffRecord: any;
  setSelectedStaffRecord: React.Dispatch<React.SetStateAction<any>>;
  showStaffModal: boolean;
  setShowStaffModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedMailRecord: any;
  setSelectedMailRecord: React.Dispatch<React.SetStateAction<any>>;
  showMailModal: boolean;
  setShowMailModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedAccommodationRecord: any;
  setSelectedAccommodationRecord: React.Dispatch<React.SetStateAction<any>>;
  showAccommodationModal: boolean;
  setShowAccommodationModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedMammyRecord: any;
  setSelectedMammyRecord: React.Dispatch<React.SetStateAction<any>>;
  showMammyModal: boolean;
  setShowMammyModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLibraryRecord: any;
  setSelectedLibraryRecord: React.Dispatch<React.SetStateAction<any>>;
  showLibraryModal: boolean;
  setShowLibraryModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedEquipmentRecord: any;
  setSelectedEquipmentRecord: React.Dispatch<React.SetStateAction<any>>;
  showEquipmentModal: boolean;
  setShowEquipmentModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVehicleRecord: any;
  setSelectedVehicleRecord: React.Dispatch<React.SetStateAction<any>>;
  showVehicleModal: boolean;
  setShowVehicleModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUnitRecord: any;
  setSelectedUnitRecord: React.Dispatch<React.SetStateAction<any>>;
  showUnitModal: boolean;
  setShowUnitModal: React.Dispatch<React.SetStateAction<boolean>>;

  selectedAmmunitionRecord: any;
  setSelectedAmmunitionRecord: React.Dispatch<React.SetStateAction<any>>;
  showAmmunitionModal: boolean;
  setShowAmmunitionModal: React.Dispatch<React.SetStateAction<boolean>>;

  showAdminDetails: any;
  setShowAdminDetails: React.Dispatch<React.SetStateAction<any>>;
  adminDetails: any;
  setAdminDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContextProvider = ({ children }: any) => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const [selectedDepartmentRecord, setSelectedDepartmentRecord] = useState<MainTableData | null>(
    null
  );
  const [showAddRecordModal, setShowAddRecordModal] = useState<boolean>(false);

  const [selectedDutyReport, setSelectedDutyReport] = useState<any>(null);
  const [showDutyReportModal, setShowDutyReportModal] = useState<boolean>(false);

  const [selectedBiodata, setSelectedBiodata] = useState<any>(null);
  const [selectedBiodataObj, setSelectedBiodataObj] = useState<any>(null);
  const [selectedSickReportObj, setSelectedSickReportObj] = useState<any>(null);

  const [showBiodataModal, setShowBiodataModal] = useState<boolean>(false);

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showRecordModal, setShowRecordModal] = useState<boolean>(false);

  const [showUnitHoldingModal, setShowUnitHoldingModal] = useState<any>(null);

  const [selectedRecordTwo, setSelectedRecordTwo] = useState<any>(null);
  const [showRecordModalTwo, setShowRecordModalTwo] = useState<boolean>(false);

  const [selectedSickRecord, setSelectedSickRecord] = useState<any>(null);
  const [showSickModal, setShowSickModal] = useState<boolean>(false);

  const [selectedLeaveRecord, setSelectedLeaveRecord] = useState<any>(null);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  const [selectedTrialRecord, setSelectedTrialRecord] = useState<any>(null);
  const [showTrialModal, setShowTrialModal] = useState<boolean>(false);

  const [selectedDisciplineRecord, setSelectedDisciplineRecord] = useState<any>(null);
  const [showDisciplineModal, setShowDisciplineModal] = useState<boolean>(false);

  const [selectedSignalRecord, setSelectedSignalRecord] = useState<any>(null);
  const [showSignalModal, setShowSignalModal] = useState<boolean>(false);

  const [selectedGuardRecord, setSelectedGuardRecord] = useState<any>(null);
  const [showGuardModal, setShowGuardModal] = useState<boolean>(false);

  const [selectedStaffRecord, setSelectedStaffRecord] = useState<any>(null);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);

  const [selectedMailRecord, setSelectedMailRecord] = useState<any>(null);
  const [showMailModal, setShowMailModal] = useState<boolean>(false);

  const [selectedAccommodationRecord, setSelectedAccommodationRecord] = useState<any>(null);
  const [showAccommodationModal, setShowAccommodationModal] = useState<boolean>(false);

  const [selectedMammyRecord, setSelectedMammyRecord] = useState<any>(null);
  const [showMammyModal, setShowMammyModal] = useState<boolean>(false);

  const [selectedLibraryRecord, setSelectedLibraryRecord] = useState<any>(null);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);

  const [selectedEquipmentRecord, setSelectedEquipmentRecord] = useState<any>(null);
  const [showEquipmentModal, setShowEquipmentModal] = useState<boolean>(false);

  const [selectedVehicleRecord, setSelectedVehicleRecord] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState<boolean>(false);

  const [selectedUnitRecord, setSelectedUnitRecord] = useState<any>(null);
  const [showUnitModal, setShowUnitModal] = useState<boolean>(false);

  const [selectedAmmunitionRecord, setSelectedAmmunitionRecord] = useState<any>(null);
  const [showAmmunitionModal, setShowAmmunitionModal] = useState<boolean>(false);

  const [showAdminDetails, setShowAdminDetails] = useState<any>(null);
  const [adminDetails, setAdminDetails] = useState<any>(null);

  return (
    <AppContext.Provider
      value={{
        selectedBiodataObj,
        setSelectedBiodataObj,
        selectedSickReportObj,
        setSelectedSickReportObj,

        showUnitHoldingModal,
        setShowUnitHoldingModal,

        showNav,
        setShowNav,
        showAddRecordModal,
        setShowAddRecordModal,
        selectedDepartmentRecord,
        setSelectedDepartmentRecord,
        selectedDutyReport,
        setSelectedDutyReport,
        showDutyReportModal,
        setShowDutyReportModal,
        showBiodataModal,
        setShowBiodataModal,
        selectedBiodata,
        setSelectedBiodata,
        selectedRecord,
        setSelectedRecord,
        showRecordModal,
        setShowRecordModal,
        selectedRecordTwo,
        setSelectedRecordTwo,
        showRecordModalTwo,
        setShowRecordModalTwo,
        selectedSickRecord,
        setSelectedSickRecord,
        showSickModal,
        setShowSickModal,
        selectedLeaveRecord,
        setSelectedLeaveRecord,
        showLeaveModal,
        setShowLeaveModal,
        selectedTrialRecord,
        setSelectedTrialRecord,
        showTrialModal,
        setShowTrialModal,
        selectedDisciplineRecord,
        setSelectedDisciplineRecord,
        showDisciplineModal,
        setShowDisciplineModal,
        selectedSignalRecord,
        setSelectedSignalRecord,
        showSignalModal,
        setShowSignalModal,
        selectedGuardRecord,
        setSelectedGuardRecord,
        showGuardModal,
        setShowGuardModal,
        selectedStaffRecord,
        setSelectedStaffRecord,
        showStaffModal,
        setShowStaffModal,
        selectedMailRecord,
        setSelectedMailRecord,
        showMailModal,
        setShowMailModal,
        selectedAccommodationRecord,
        setSelectedAccommodationRecord,
        showAccommodationModal,
        setShowAccommodationModal,
        selectedMammyRecord,
        setSelectedMammyRecord,
        showMammyModal,
        setShowMammyModal,
        selectedLibraryRecord,
        setSelectedLibraryRecord,
        showLibraryModal,
        setShowLibraryModal,
        selectedEquipmentRecord,
        setSelectedEquipmentRecord,
        showEquipmentModal,
        setShowEquipmentModal,
        selectedVehicleRecord,
        setSelectedVehicleRecord,
        showVehicleModal,
        setShowVehicleModal,
        selectedUnitRecord,
        setSelectedUnitRecord,
        showUnitModal,
        setShowUnitModal,
        selectedAmmunitionRecord,
        setSelectedAmmunitionRecord,
        showAmmunitionModal,
        setShowAmmunitionModal,
        showAdminDetails,
        setShowAdminDetails,
        adminDetails,
        setAdminDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
