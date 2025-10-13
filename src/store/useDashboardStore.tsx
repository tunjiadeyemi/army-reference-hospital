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
  mailArchive:any;
  books?: any;
  book?: any;
  



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
  setMailArchive:(data:any) => void;
  setBooks:(data:any) => void;
  setBook:(data:any) => void;

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
      setBooks: (data) => set({books: data}),
      setBook: (data) => set({book: data}),

    }),
    {
      name: 'dashboard-store'
    }
  )
);
