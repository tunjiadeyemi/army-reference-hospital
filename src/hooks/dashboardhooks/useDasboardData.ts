import {
  createAmmunition,
  createBooks,
  createDepartmentFile,
  createEquipmentInventory,
  createMailArchive,
  createOfficers,
  createSickReport,
  createUnitHoldingArms,
  createVehicleInventory,
  getArm,
  getArms,
  getBooks,
  getBooksById,
  getDepartmentFile,
  getDepartmentFiles,
  getEquipmentInventorys,
 
  getMailArchives,
  getOfficerById,
  getOfficers,
  getOverview,
  getSickReport,
  getSickReports,
  // getUnitHoldingArm,
  getUnitHoldingArms,
  // getVehicleInventory,
  getVehicleInventorys,
  updateAmmunition,
  updateBooks,
  updateDepartmentFile,
  updateEquipmentInventory,
  updateMailArchive,
  updateOfficer,
  updateSickReport,
  updateUnitHoldingArms,
  updateVehicleInventory
} from '../../services/dashboardApi/dashboardServices';

import { useDashboardStore } from '../../store/useDashboardStore';
import type { CreateOfficerPayload, Officer } from '../../utils/types/unitBible';
import { usePersistedMutation } from '../usePersistedMutation';
import { usePersistedQuery } from '../usePersistedQuery';

// export interface Officer {
//   id: string;
//   name: string;
//   rank: string;
//   badge: string;
//   department: string;
// }

export interface UpdateOfficerPayload {
  id: string | number;
  name?: string;
  rank?: string;
  badge?: string;
  department?: string;
}

export interface DeleteOfficerPayload {
  id: string | number;
}

// GET HOOKS ====================================================>>>>>>>>
//OVERVIEW

export const useOverviewData = () => {
  const { overview, setOverview } = useDashboardStore();
  return usePersistedQuery('overview', getOverview, setOverview, overview); // key, api function, setterFunction, state variable
};

//DEPARTMENT FILES
export const useDeptFilesData = () => {
  const { deptFiles, setDeptFiles } = useDashboardStore();
  return usePersistedQuery('deptFiles', getDepartmentFiles, setDeptFiles, deptFiles);
};

//----->GETS BY ID ------->//

export const useGetDeptFileData = () => {
  const { deptFile, setDeptFile } = useDashboardStore();
  return usePersistedQuery('deptFile', getDepartmentFile, setDeptFile, deptFile);
};

//SICK REPORT

export const useGetSickReports = () => {
  const { sickReports, setSickReports } = useDashboardStore();
  return usePersistedQuery('sickReports', getSickReports, setSickReports, sickReports);
};
export const useGetSickReport = () => {
  const { sickReport, setSickReport } = useDashboardStore();
  return usePersistedQuery('sickReport', getSickReport, setSickReport, sickReport);
};

//AMMUNITIONS

export const useGetArmsData = () => {
  const { arms, setArms } = useDashboardStore();
  return usePersistedQuery('arms', getArms, setArms, arms);
};
export const useGetArmData = () => {
  const { arm, setArm } = useDashboardStore();
  return usePersistedQuery('arm', getArm, setArm, arm);
};
//UNIT HOLDING ARMS 

export const useGetUnitHoldingArms = () => {
  const { unitHoldingArms, setUnitHoldingArms } = useDashboardStore();
  return usePersistedQuery('unitHoldingArms', getUnitHoldingArms, setUnitHoldingArms, unitHoldingArms);
};
// export const useGetUnitHoldingArm = () => {
//   const { arm, setArm } = useDashboardStore();
//   return usePersistedQuery('unitHoldingArm', getUnitHoldingArm, setArm, arm);
// };

//OFFICERS (unitBible/list)
export const useOfficersData = () => {
  const { officers, setOfficers } = useDashboardStore();
  return usePersistedQuery('officers', getOfficers, setOfficers, officers);
};
export const useOfficerData = () => {
  const { officer, setOfficer } = useDashboardStore();
  return usePersistedQuery('officer', getOfficerById, setOfficer, officer);
};


//MAIL ARCHIVE (unitBible/list)
export const useGetMailArchives = () => {
  const { mailArchives, setMailArchives } = useDashboardStore();
  return usePersistedQuery('mailArchives',  getMailArchives , setMailArchives, mailArchives);
};
export const useGetMailArchive = () => {
  const { mailArchive, setMailArchive } = useDashboardStore();
  return usePersistedQuery('mailArchive', getOfficerById, setMailArchive, mailArchive);
};

// LIBRARY BOOKS

export const useGetBooks = () => {
  const { books, setBooks } = useDashboardStore();
  return usePersistedQuery('books',  getBooks , setBooks, books);
};
export const useGetBook = () => {
  const { book, setBook } = useDashboardStore();
  return usePersistedQuery('book', getBooksById, setBook, book);
};

//VEHICLE INVENTORY

export const useGetVehicleInventory = () => {
  const { vehicleInventorys, setVehicleInventorys } = useDashboardStore();
  return usePersistedQuery(
    'vehicleInventorys',
    getVehicleInventorys,
    setVehicleInventorys,
    vehicleInventorys
  );
};
export const useGetVehicleInventorys = () => {
  const { vehicleInventory, setVehicleInventory } = useDashboardStore();
  return usePersistedQuery(
    'vehicleInventory',
    getVehicleInventorys,
    setVehicleInventory,
    vehicleInventory
  );
};
export const useGetEquipmentInventorys = () => {
  const { equipmentInventory, setEquipmentInventory } = useDashboardStore();
  return usePersistedQuery(
    'equipmentInventory',
    getEquipmentInventorys,
    setEquipmentInventory,
    equipmentInventory
  );
};

// POST HOOKS ====================================================>>>>>>>>

//OFFICERS (unitBible/list)
export const useCreateOfficer = () => {
  return usePersistedMutation<Officer, Error, any>(
    createOfficers, // mutationFn - receives the payload
    'officers', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Officer created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};
export const useUpdateOfficer = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateOfficer, // mutationFn - receives the payload
    'officers', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Officer created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};


//LIBRARY BOOKS 

export const useCreateBooks = () => {
  return usePersistedMutation<Officer, Error, CreateOfficerPayload>(
    createBooks, // mutationFn - receives the payload
    'books', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Books created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};
export const useUpdateBooks = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateBooks, // mutationFn - receives the payload
    'book', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Officer created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};


export const useCreateMailArchive = () => {
  return usePersistedMutation<Officer, Error, CreateOfficerPayload>(
    createMailArchive, // mutationFn - receives the payload
    'books', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Books created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};
export const useUpdateMailArchive = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateMailArchive, // mutationFn - receives the payload
    'book', // invalidateKeys - refetches officers query
    (data) => {
      // onSuccess callback
      console.log('Officer created:', data);
      // Optional: toast.success('Officer created successfully');
    },
    (error) => {
      // onError callback
      console.error('Failed to create officer:', error);
      // Optional: toast.error('Failed to create officer');
    }
  );
};

//DEPARTMENT
//-----POST

export const useCreateDepartmentFile = () => {
  return usePersistedMutation<Officer, Error, any>(
    createDepartmentFile, // mutationFn - receives the payload
    'deptFiles', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Department created:', data);
    },
    (error) => {
      console.error('Failed to create officer:', error);
    }
  );
};
//-----PATCH
export const useUpdateDepartmentFile = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateDepartmentFile, // mutationFn - receives the payload
    'deptFile', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Department created:', data);
    },
    (error) => {
      console.error('Failed to create officer:', error);
    }
  );
};

//SICK REPORT
//-----POST
export const useCreateSickReport = () => {
  return usePersistedMutation<Officer, Error, any>(
    createSickReport, // mutationFn - receives the payload
    'sickReports', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Sick Report created:', data);
    },
    (error) => {
      console.error('Failed to create officer:', error);
    }
  );
};
//-----PATCH
export const useUpdateSickReport = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateSickReport, // mutationFn - receives the payload
    'sickReports', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Sick Report created:', data);
    },
    (error) => {
      console.error('Failed to create sick reports:', error);
    }
  );
};

//ARMS
//-----POST
export const useCreateAmmunition = () => {
  return usePersistedMutation<Officer, Error, any>(
    createAmmunition, // mutationFn - receives the payload
    'arms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Ammunition created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateAmmunition = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateAmmunition, // mutationFn - receives the payload
    'arms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Sick Report created:', data);
    },
    (error) => {
      console.error('Failed to create sick reports:', error);
    }
  );
};

//ARMS
//-----POST
export const useCreateUnitHoldingArms= () => {
  return usePersistedMutation<Officer, Error, any>(
    createUnitHoldingArms, // mutationFn - receives the payload
    'unitHoldingArms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Ammunition created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUnitHoldingArms = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateUnitHoldingArms, // mutationFn - receives the payload
    'unitHoldingArms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Sick Report created:', data);
    },
    (error) => {
      console.error('Failed to create sick reports:', error);
    }
  );
};

//VEHICLE INVENTORY
//-----POST
export const useCreateVehicleInventory = () => {
  return usePersistedMutation<Officer, Error, any>(
    createVehicleInventory, // mutationFn - receives the payload
    'vehicleInventorys', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Vehicle Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateVehicleInventory = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateVehicleInventory, // mutationFn - receives the payload
    'vehicleInventorys', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Vehicle Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create Vehicle Inventory  reports:', error);
    }
  );
};

//EQUIPMENT INVENTORY

//-----POST
export const useCreateEquipmentInventory = () => {
  return usePersistedMutation<Officer, Error, any>(
    createEquipmentInventory, // mutationFn - receives the payload
    'EquipmentInventorys', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateEquipmentInventory = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateEquipmentInventory, // mutationFn - receives the payload
    'EquipmentInventorys', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create Equipment Inventory  reports:', error);
    }
  );
};
