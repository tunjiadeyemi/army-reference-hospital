import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  overview?: any;
  deptFiles?: any;
  officers?: any;
  officer?: any;
  arms?: any;
  deptFile?: any;
  sickReports?: any;
  sickReport?: any;
  arm?: any;
  vehicleInventorys?: any;
  vehicleInventory?: any;
  equipmentInventory?: any;
  unitHoldingArms?: any;
  mailArchives?: any;
  mailArchive: any;
  books?: any;
  book?: any;
  mammyMarkets: any;
  staffNominals: any;
  staffNominal: any;
  accomodation: any;
  guardRoom: any;
  signalForms: any;
  signalForm: any;
  trialForms: any;
  trialForm: any;
  chargeSheets?: any;
  chargeSheet?: any;
  users: any;

  setOverview: (data: any) => void;
  setDeptFiles: (data: any) => void;
  setDeptFile: (data: any) => void;
  setOfficers: (data: any) => void;
  setOfficer: (data: any) => void;
  setArms: (data: any) => void;
  setArm: (data: any) => void;
  setSickReports: (data: any) => void;
  setSickReport: (data: any) => void;
  setVehicleInventorys: (data: any) => void;
  setVehicleInventory: (data: any) => void;
  setEquipmentInventory: (data: any) => void;
  setUnitHoldingArms: (data: any) => void;
  setMailArchives: (data: any) => void;
  setMailArchive: (data: any) => void;
  setBooks: (data: any) => void;
  setBook: (data: any) => void;
  setMammyMarkets: (data: any) => void;
  setStaffNominals: (data: any) => void;
  setStaffNominal: (data: any) => void;
  setAccomodation: (data: any) => void;
  setGuardRoom: (data: any) => void;
  setSignalForms: (data: any) => void;
  setSignalForm: (data: any) => void;
  setTrialForms: (data: any) => void;
  setTrialForm: (data: any) => void;
  setChargeSheets: (data: any) => void;
  setChargeSheet: (data: any) => void;
  setUsers: (data: any) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      overview: undefined,
      deptFiles: undefined,
      deptFile: undefined,
      officers: undefined,
      officer: undefined,
      arms: undefined,
      arm: undefined,
      sickReport: undefined,
      sickReports: undefined,
      vehicleInventorys: undefined,
      vehicleInventory: undefined,
      equipmentInventory: undefined,
      unitHoldingArms: undefined,
      mailArchives: undefined,
      mailArchive: undefined,
      books: undefined,
      book: undefined,
      mammyMarkets: undefined,
      staffNominals: undefined,
      accomodation: undefined,
      guardRoom: undefined,
      signalForms: undefined,
      signalForm: undefined,
      trialForms: undefined,
      trialForm: undefined,
      staffNominal: undefined,
      users: undefined,

      setOverview: (data) => set({ overview: data }),
      setDeptFiles: (data) => set({ deptFiles: data }),
      setDeptFile: (data) => set({ deptFile: data }),
      setOfficers: (data) => set({ officers: data }),
      setOfficer: (data) => set({ officer: data }),
      setArms: (data) => set({ arms: data }),
      setArm: (data) => set({ arm: data }),
      setSickReports: (data) => set({ sickReports: data }),
      setSickReport: (data) => set({ sickReport: data }),
      setVehicleInventorys: (data) => set({ vehicleInventorys: data }),
      setVehicleInventory: (data) => set({ vehicleInventory: data }),
      setEquipmentInventory: (data) => set({ equipmentInventory: data }),
      setUnitHoldingArms: (data) => set({ unitHoldingArms: data }),
      setMailArchives: (data) => set({ mailArchives: data }),
      setMailArchive: (data) => set({ mailArchive: data }),
      setBooks: (data) => set({ books: data }),
      setBook: (data) => set({ book: data }),
      setMammyMarkets: (data) => set({ mammyMarkets: data }),
      setStaffNominals: (data) => set({ staffNominals: data }),
      setStaffNominal: (data) => set({ staffNominal: data }),
      setAccomodation: (data) => set({ accomodation: data }),
      setGuardRoom: (data) => set({ guardRoom: data }),
      setSignalForms: (data) => set({ signalForms: data }),
      setSignalForm: (data) => set({ signalForm: data }),
      setTrialForms: (data) => set({ trialForms: data }),
      setTrialForm: (data) => set({ trialForm: data }),
      setChargeSheets: (data) => set({ chargeSheets: data }),
      setChargeSheet: (data) => set({ chargeSheet: data }),
      setUsers: (data: any) => set({ users: data })
    }),
    {
      name: 'dashboard-store'
    }
  )
);
