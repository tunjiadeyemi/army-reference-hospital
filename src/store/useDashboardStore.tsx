
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardState {
  overview?: any;
  deptFiles?: any;
  officers?: any;
  officer?: any;
  arms?: any;
  deptFile?:any;
  sickReports?:any;
  sickReport?:any;
  arm?:any;
  vehicleInventorys?:any;
  vehicleInventory?:any;
  

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
      sickReport:undefined,
       sickReports: undefined,
       vehicleInventorys:undefined,
       vehicleInventory:undefined,

      setOverview: (data) => set({ overview: data }),
      setDeptFiles: (data) => set({ deptFiles: data }),
      setDeptFile: (data) => set({ deptFile: data }),
      setOfficers: (data) => set({ officers: data }),
      setOfficer: (data) => set({ officer: data }),
      setArms: (data) => set({ arms: data }),
      setArm: (data) => set({ arm: data }),
      setSickReports: (data) => set({  sickReports: data }),
      setSickReport: (data) => set({  sickReport: data }),
      setVehicleInventorys: (data) => set({ vehicleInventorys: data }),
      setVehicleInventory: (data) => set({ vehicleInventory: data }),
    }),
    {
      name: "dashboard-store", 
    }
  )
);
