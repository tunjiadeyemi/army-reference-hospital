import {
  createAccomodation,
  createAmmunition,
  createBooks,
  createDepartmentFile,
  createEquipmentInventory,
  createGuardRoom,
  createMailArchive,
  createMammyMarket,
  createOfficers,
  createSignalForm,
  createSickReport,
  createStaffNominal,
  createTrialForm,
  createUnitHoldingArms,
  createVehicleInventory,
  deleteSignalForm,
  deleteTrialForm,
  getAccomodations,
  getArm,
  getArms,
  getBooks,
  getBooksById,
  getDepartmentFile,
  getDepartmentFiles,
  getEquipmentInventorys,
  getGuardRooms,
  getMailArchives,
  getMammyMarkets,
  getOfficerById,
  getOfficers,
  getOverview,
  getSignalFormById,
  getSignalForms,
  getSickReport,
  getSickReports,
  getStaffNominal,
  getStaffNominals,
  getTrialFormById,
  getTrialForms,
  // getUnitHoldingArm,
  getUnitHoldingArms,
  getUsers,
  // getVehicleInventory,
  getVehicleInventorys,
  updateAccomodation,
  updateAmmunition,
  updateBooks,
  updateDepartmentFile,
  updateEquipmentInventory,
  updateGuardRoom,
  updateMailArchive,
  updateMammyMarket,
  updateOfficer,
  updateSignalForm,
  updateSickReport,
  updateStaffNominal,
  updateTrialForm,
  updateUnitHoldingArms,
  updateVehicleInventory,
  createChargeSheet,
  getChargeSheets,
  getChargeSheetById,
  updateChargeSheet,
  deleteChargeSheet
} from '../../services/dashboardApi/dashboardServices';

import { useDashboardStore } from '../../store/useDashboardStore';
import type { CreateOfficerPayload, Officer } from '../../utils/types/unitBible';
import { usePersistedMutation } from '../usePersistedMutation';
import { usePersistedQuery } from '../usePersistedQuery';
import { showSuccess, showError } from '../../utils/toast';

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

export const useGetUsers = () => {
  const { users, setUsers } = useDashboardStore();
  return usePersistedQuery('users', getUsers, setUsers, users);
};
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
  return usePersistedQuery(
    'unitHoldingArms',
    getUnitHoldingArms,
    setUnitHoldingArms,
    unitHoldingArms
  );
};

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
  return usePersistedQuery('mailArchives', getMailArchives, setMailArchives, mailArchives);
};
export const useGetMailArchive = () => {
  const { mailArchive, setMailArchive } = useDashboardStore();
  return usePersistedQuery('mailArchive', getOfficerById, setMailArchive, mailArchive);
};

// LIBRARY BOOKS

export const useGetBooks = () => {
  const { books, setBooks } = useDashboardStore();
  return usePersistedQuery('books', getBooks, setBooks, books);
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

export const useGetMammyMarkets = () => {
  const { mammyMarkets, setMammyMarkets } = useDashboardStore();
  return usePersistedQuery('mammyMarket', getMammyMarkets, setMammyMarkets, mammyMarkets);
};
export const useGetAccomodations = () => {
  const { accomodation, setAccomodation } = useDashboardStore();
  return usePersistedQuery('allAccomodations', getAccomodations, setAccomodation, accomodation);
};
export const useGetStaffNominals = () => {
  const { staffNominals, setStaffNominals } = useDashboardStore();
  return usePersistedQuery('staffNominals', getStaffNominals, setStaffNominals, staffNominals);
};
export const useGetStaffNominal = (id?: number) => {
  const { staffNominal, setStaffNominal } = useDashboardStore();

  return usePersistedQuery({
    key: `staffNominal-${id ?? 'none'}`,
    queryFn: () => getStaffNominal(id),
    setStoreValue: setStaffNominal,
    currentStoreValue: staffNominal,
    enabled: !!id,
    staleTime: 0
  });
};
export const useGetGuardRooms = () => {
  const { guardRoom, setGuardRoom } = useDashboardStore();
  return usePersistedQuery('guardRooms', getGuardRooms, setGuardRoom, guardRoom);
};

//SIGNAL FORMS
export const useGetSignalForms = () => {
  const { signalForms, setSignalForms } = useDashboardStore();

  const query = usePersistedQuery({
    key: 'signalForms',
    queryFn: async () => {
      console.log('[Signal Forms] Fetching from API...');
      const result = await getSignalForms();
      console.log('[Signal Forms] API Response:', result);
      return result;
    },
    setStoreValue: setSignalForms,
    currentStoreValue: signalForms,
    enabled: true, // Force fetch always
    staleTime: 0 // Force fresh fetch
    // gcTime: 5 * 60 * 1000 // 5 minutes cache
  });

  console.log('[Signal Forms] Query State:', {
    isLoading: query.isLoading,
    error: query.error,
    dataLength: Array.isArray(query.data) ? query.data.length : 0
  });

  return query;
};

export const useGetSignalForm = (id?: number) => {
  const { signalForm, setSignalForm } = useDashboardStore();

  return usePersistedQuery({
    key: `signalForm-${id ?? 'none'}`,
    queryFn: () => getSignalFormById(id),
    setStoreValue: setSignalForm,
    currentStoreValue: signalForm,
    enabled: !!id,
    staleTime: 0
  });
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
export const useCreateUnitHoldingArms = () => {
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

//MAMMY MARKET

//OFFICERS (unitBible/list)
export const useCreateMammyMarkets = () => {
  return usePersistedMutation<Officer, Error, any>(
    createMammyMarket, // mutationFn - receives the payload
    'markets', // invalidateKeys - refetches officers query
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
export const useUpdateMammyMarkets = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateMammyMarket, // mutationFn - receives the payload
    'updateMammyMarket', // invalidateKeys - refetches officers query
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

//ACCOMODATIONS
//-----POST

export const useCreateAccomodation = () => {
  return usePersistedMutation<Officer, Error, any>(
    createAccomodation, // mutationFn - receives the payload
    'accomodations', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateAccomodation = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateAccomodation, // mutationFn - receives the payload
    'accomodations', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create Equipment Inventory  reports:', error);
    }
  );
};

//STAFF NOMINAL
//-----POST

export const useCreateStaffNominal = () => {
  return usePersistedMutation<Officer, Error, any>(
    createStaffNominal, // mutationFn - receives the payload
    'staffNominals', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateStaffNominal = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateStaffNominal, // mutationFn - receives the payload
    'staffNominals', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create Equipment Inventory  reports:', error);
    }
  );
};

//GUARD ROOM
//-----POST

export const useCreateGuardRoom = () => {
  return usePersistedMutation<Officer, Error, any>(
    createGuardRoom, // mutationFn - receives the payload
    'guardRooms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create ammunition:', error);
    }
  );
};
//-----PATCH
export const useUpdateGuardRoom = () => {
  return usePersistedMutation<Officer, Error, any>(
    updateGuardRoom, // mutationFn - receives the payload
    'guardRooms', // invalidateKeys - refetches officers query
    (data) => {
      console.log('Equipment Inventory created:', data);
    },
    (error) => {
      console.error('Failed to create Equipment Inventory  reports:', error);
    }
  );
};
// SIGNAL FORMS MUTATIONS
export const useCreateSignalForm = () => {
  return usePersistedMutation<any, Error, any>(
    async (payload) => {
      console.log('[CREATE Signal Form] Payload:', payload);
      const result = await createSignalForm(payload);
      console.log('[CREATE Signal Form] Response:', result);
      return result;
    },
    'signalForms',
    (data) => {
      console.log('[CREATE Signal Form] Success:', data);
      showSuccess('Signal form created successfully!');
    },
    (error) => {
      console.error('[CREATE Signal Form] Error:', error);
      showError('Failed to create signal form');
    }
  );
};

export const useUpdateSignalForm = () => {
  return usePersistedMutation<any, Error, any>(
    async (payload) => {
      console.log('[UPDATE Signal Form] Payload:', payload);
      const result = await updateSignalForm(payload);
      console.log('[UPDATE Signal Form] Response:', result);
      return result;
    },
    'signalForms',
    (data) => {
      console.log('[UPDATE Signal Form] Success:', data);
      showSuccess('Signal form updated successfully!');
    },
    (error) => {
      console.error('[UPDATE Signal Form] Error:', error);
      showError('Failed to update signal form');
    }
  );
};

export const useDeleteSignalForm = () => {
  return usePersistedMutation<void, Error, string | number>(
    deleteSignalForm,
    'signalForms',
    (data) => {
      console.log('Signal form deleted:', data);
    },
    (error) => {
      console.error('Failed to delete signal form:', error);
    }
  );
};

// TRIAL FORMS
export const useGetTrialForms = () => {
  const { trialForms, setTrialForms } = useDashboardStore();

  const query = usePersistedQuery({
    key: 'trialForms',
    queryFn: async () => {
      console.log('[Trial Forms] Fetching from API...');
      const result = await getTrialForms();
      console.log('[Trial Forms] API Response:', result);
      return result;
    },
    setStoreValue: setTrialForms,
    currentStoreValue: trialForms,
    enabled: true,
    staleTime: 0
  });

  console.log('[Trial Forms] Query State:', {
    isLoading: query.isLoading,
    error: query.error,
    dataLength: Array.isArray(query.data) ? query.data.length : 0
  });

  return query;
};

export const useGetTrialForm = (id?: number) => {
  const { trialForm, setTrialForm } = useDashboardStore();

  return usePersistedQuery({
    key: `trialForm-${id ?? 'none'}`,
    queryFn: () => getTrialFormById(id),
    setStoreValue: setTrialForm,
    currentStoreValue: trialForm,
    enabled: !!id,
    staleTime: 0
  });
};

export const useCreateTrialForm = () => {
  return usePersistedMutation<any, Error, any>(
    async (payload) => {
      console.log('[CREATE Trial Form] Payload:', payload);
      const result = await createTrialForm(payload);
      console.log('[CREATE Trial Form] Response:', result);
      return result;
    },
    'trialForms',
    (data) => {
      console.log('[CREATE Trial Form] Success:', data);
      showSuccess('Trial form created successfully!');
    },
    (error) => {
      console.error('[CREATE Trial Form] Error:', error);
      showError('Failed to create trial form');
    }
  );
};

export const useUpdateTrialForm = () => {
  return usePersistedMutation<any, Error, any>(
    async (payload) => {
      console.log('[UPDATE Trial Form] Payload:', payload);
      const result = await updateTrialForm(payload);
      console.log('[UPDATE Trial Form] Response:', result);
      return result;
    },
    'trialForms',
    (data) => {
      console.log('[UPDATE Trial Form] Success:', data);
      showSuccess('Trial form updated successfully!');
    },
    (error) => {
      console.error('[UPDATE Trial Form] Error:', error);
      showError('Failed to update trial form');
    }
  );
};

export const useDeleteTrialForm = () => {
  return usePersistedMutation<void, Error, string | number>(
    deleteTrialForm,
    'trialForms',
    (data) => {
      console.log('Trial form deleted:', data);
    },
    (error) => {
      console.error('Failed to delete trial form:', error);
    }
  );
};

// Charge Sheet Hooks
export const useGetChargeSheets = () => {
  const { chargeSheets, setChargeSheets } = useDashboardStore();

  const query = usePersistedQuery({
    key: 'chargeSheets',
    queryFn: async () => {
      console.log('[Charge Sheets] Fetching from API...');
      const result = await getChargeSheets();
      console.log('[Charge Sheets] API Response:', result);
      return result;
    },
    setStoreValue: setChargeSheets,
    currentStoreValue: chargeSheets,
    enabled: true,
    staleTime: 0
  });

  return query;
};

export const useGetChargeSheet = (id: string | number | null) => {
  const { chargeSheet, setChargeSheet } = useDashboardStore();

  const query = usePersistedQuery({
    key: `chargeSheet-${id}`,
    queryFn: async () => {
      if (!id) return null;
      console.log('[Charge Sheet] Fetching from API with ID:', id);
      const result = await getChargeSheetById(id);
      console.log('[Charge Sheet] API Response:', result);
      return result;
    },
    setStoreValue: setChargeSheet,
    currentStoreValue: chargeSheet,
    enabled: !!id,
    staleTime: 0
  });

  return query;
};

export const useCreateChargeSheet = () => {
  return usePersistedMutation<any, Error, any>(
    createChargeSheet,
    'chargeSheets',
    (data) => {
      console.log('Charge sheet created:', data);
    },
    (error) => {
      console.error('Failed to create charge sheet:', error);
    }
  );
};

export const useUpdateChargeSheet = () => {
  return usePersistedMutation<any, Error, any>(
    updateChargeSheet,
    'chargeSheets',
    (data) => {
      console.log('Charge sheet updated:', data);
    },
    (error) => {
      console.error('Failed to update charge sheet:', error);
    }
  );
};

export const useDeleteChargeSheet = () => {
  return usePersistedMutation<void, Error, string | number>(
    deleteChargeSheet,
    'chargeSheets',
    (data) => {
      console.log('Charge sheet deleted:', data);
    },
    (error) => {
      console.error('Failed to delete charge sheet:', error);
    }
  );
};
