// import { handleApi } from "../../utils/apiHelper";
import type { CreateOfficerPayload } from '../../utils/types/unitBible';
import api from '../api';

const convertToCustomDate = (date: string | Date | undefined): string => {
  if (!date) return '';

  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Handle string in DD/MM/YYYY format
  const parts = date.split('/');

  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // If it’s already a standard ISO or other recognizable format
  const parsed = new Date(date);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return '';
};

// USERS/ADMIN
export const getUsers = async () => {
  const res = await api.get('/v1/admin-users');
  return res.data;
};

// OVERVIEW

export const getOverview = async () => {
  const res = await api.get('/v1/overview');
  return res.data;
};

//OFFICERS

export const getOfficers = async () => {
  const res = await api.get('/v1/officers');
  return res.data;
};

export const getOfficerById = async (id?: string | number) => {
  const res = await api.get(`/v1/officers/${id}`);
  return res.data;
};

// export const createOfficers = async (payload: any) => {
//   const res = await api.post('/v1/officers/create', payload);
//

export const createOfficers = async (payload: CreateOfficerPayload) => {
  console.log('Final Payload:', payload);
  const formData = new FormData();

  // Basic fields
  formData.append('name', payload.name || '');
  formData.append('email', payload.email || '');
  formData.append('rank', payload.rank || '');
  formData.append('serviceNumber', payload.serviceNumber || '');
  formData.append('corps', payload.corps || '');
  formData.append('qualification', payload.qualification || '');
  formData.append('qualificationTrade', payload.qualification || '');

  // Dates
  formData.append('dateOfBirth', convertToCustomDate(payload.dateOfBirth));
  formData.append('dateOfCommission', convertToCustomDate(payload.dateOfCommission));
  formData.append('dateOfLastPromotion', convertToCustomDate(payload.dateOfLastPromotion));
  formData.append('dateOfPostedIn', convertToCustomDate(payload.dateOfPostedIn));
  formData.append('dateOfTakingStrength', convertToCustomDate(payload.dateOfTakingStrength));

  // Other details
  formData.append('directorate', payload.directorate || '');
  formData.append('sex', payload.sex || '');
  formData.append('bloodGroup', payload.bloodGroup || '');
  formData.append('genotype', payload.genotype || '');
  formData.append('religion', payload.religion || '');
  formData.append('maritalStatus', payload.maritalStatus || '');
  formData.append('phoneNumber', payload.phoneNumber || '');
  formData.append('placeOfBirth', payload.placeOfBirth || '');
  formData.append('stateOfOrigin', payload.stateOfOrigin || '');
  formData.append('lga', payload.lga || '');

  // Address
  formData.append('permanentAddress', payload.permanentAddress || '');
  formData.append('permanentHomeAddress', payload.permanentAddress || '');
  formData.append('emailAddress', payload.emailAddress || '');

  // Family info
  formData.append('numberOfChildren', String(payload.numberOfChildren || 0));
  formData.append('numberOfWives', String(payload.numberOfWives || 0));
  formData.append('nameOfChildren', JSON.stringify(payload.nameOfChildren || []));
  formData.append('nameOfWives', JSON.stringify(payload.nameOfWives || []));

  // Next of kin (mapped to backend expectations)
  formData.append('nameOfNextOfKin', payload.nameOfNextOfKin || '');
  formData.append('nextOfKinName', payload.nameOfNextOfKin || '');
  formData.append('relationshipWithNextOfKin', payload.relationshipWithNextOfKin || '');
  formData.append('nextOfKinRelationship', payload.relationshipWithNextOfKin || '');
  formData.append('addressOfNextOfKin', payload.addressOfNextOfKin || '');
  formData.append('nextOfKinAddress', payload.addressOfNextOfKin || '');
  formData.append('phoneNumberOfNextOfKin', payload.phoneNumberOfNextOfKin || '');
  formData.append('nextOfKinPhoneNumber', payload.phoneNumberOfNextOfKin || '');

  // Additional info
  formData.append('honourAndAward', payload.honourAndAward || '');
  formData.append('operations', '');
  formData.append('lastThreeUnits', '');
  formData.append('remarks', payload.remarks || '');

  if (payload.photo?.file) {
    formData.append('photo', payload.photo.file);
  }

  // Debug check
  // console.log([...formData.entries()]);

  const res = await api.post('/v1/officers/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateOfficer = async (payload: CreateOfficerPayload) => {
  const formData = new FormData();

  // Basic fields
  formData.append('name', payload.name || '');
  formData.append('email', payload.email || '');
  formData.append('rank', payload.rank || '');
  formData.append('serviceNumber', payload.serviceNumber || '');
  formData.append('corps', payload.corps || '');
  formData.append('qualification', payload.qualification || '');
  formData.append('qualificationTrade', payload.qualification || '');

  // Dates
  formData.append('dateOfBirth', convertToCustomDate(payload.dateOfBirth));
  formData.append('dateOfCommission', convertToCustomDate(payload.dateOfCommission));
  formData.append('dateOfLastPromotion', convertToCustomDate(payload.dateOfLastPromotion));
  formData.append('dateOfPostedIn', convertToCustomDate(payload.dateOfPostedIn));
  formData.append('dateOfTakingStrength', convertToCustomDate(payload.dateOfTakingStrength));

  // Other details
  formData.append('directorate', payload.directorate || '');
  formData.append('sex', payload.sex || '');
  formData.append('bloodGroup', payload.bloodGroup || '');
  formData.append('genotype', payload.genotype || '');
  formData.append('religion', payload.religion || '');
  formData.append('maritalStatus', payload.maritalStatus || '');
  formData.append('phoneNumber', payload.phoneNumber || '');
  formData.append('placeOfBirth', payload.placeOfBirth || '');
  formData.append('stateOfOrigin', payload.stateOfOrigin || '');
  formData.append('lga', payload.lga || '');

  // Address
  formData.append('permanentAddress', payload.permanentAddress || '');
  formData.append('permanentHomeAddress', payload.permanentAddress || '');
  formData.append('emailAddress', payload.emailAddress || '');

  // Family info
  formData.append('numberOfChildren', String(payload.numberOfChildren || 0));
  formData.append('numberOfWives', String(payload.numberOfWives || 0));
  formData.append('nameOfChildren', JSON.stringify(payload.nameOfChildren || []));
  formData.append('nameOfWives', JSON.stringify(payload.nameOfWives || []));

  // Next of kin (mapped to backend expectations)
  formData.append('nameOfNextOfKin', payload.nameOfNextOfKin || '');
  formData.append('nextOfKinName', payload.nameOfNextOfKin || '');
  formData.append('relationshipWithNextOfKin', payload.relationshipWithNextOfKin || '');
  formData.append('nextOfKinRelationship', payload.relationshipWithNextOfKin || '');
  formData.append('addressOfNextOfKin', payload.addressOfNextOfKin || '');
  formData.append('nextOfKinAddress', payload.addressOfNextOfKin || '');
  formData.append('phoneNumberOfNextOfKin', payload.phoneNumberOfNextOfKin || '');
  formData.append('nextOfKinPhoneNumber', payload.phoneNumberOfNextOfKin || '');

  // Additional info
  formData.append('honourAndAward', payload.honourAndAward || '');
  formData.append('operations', '');
  formData.append('lastThreeUnits', '');
  formData.append('remarks', payload.remarks || '');

  if (payload.photo?.file) {
    formData.append('photo', payload.photo.file);
  }

  // Debug check
  // console.log([...formData.entries()]);
  const { id } = payload;

  const res = await api.patch(`/v1/officers/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};
export const deleteOfficer = async (id: string | number) => {
  const res = await api.delete(`/v1/officers/${id}`);
  return res.data;
};

//ARMS & AMMUNITIONS

export const getArms = async () => {
  const res = await api.get('/v1/ammunitions');
  return res.data;
};
export const getArm = async (id?: number) => {
  const res = await api.get(`/v1/ammunitions/${id}`);
  return res.data;
};

export const createAmmunition = async (payload: any) => {
  const res = await api.post('/v1/ammunitions/create', payload);
  return res.data;
};

export const updateAmmunition = async (payload: any) => {
  const { id, ...data } = payload;
  const res = await api.patch(`/v1/ammunitions/create/${id}`, data);
  return res.data;
};

export const deleteArm = async (id: string | number) => {
  const res = await api.delete(`/v1/ammunitions/remove/${id}`);
  return res.data;
};

// UNIT_HOLDING ARMS

export const getUnitHoldingArms = async () => {
  const res = await api.get('/unit-holding-arms');
  return res.data;
};
export const getUnitHoldingArm = async (id?: number) => {
  const res = await api.get(`/unit-holding-arms/${id}`);
  return res.data;
};

export const createUnitHoldingArms = async (payload: any) => {
  const res = await api.post('/unit-holding-arms/create', payload);
  return res.data;
};

export const updateUnitHoldingArms = async (payload: any) => {
  const { id, ...data } = payload;
  const res = await api.patch(`/unit-holding-arms/edit/${id}`, data);
  return res.data;
};

export const deleteUnitHoldingArms = async (id: string | number) => {
  const res = await api.delete(`/unit-holding-arms/${id}`);
  return res.data;
};

//SICK REPORT

export const getSickReports = async () => {
  const res = await api.get('/v1/sick-report');
  return res.data;
};
export const getSickReport = async (id?: number) => {
  const res = await api.get(`/v1/sick-report/${id}`);
  return res.data;
};

export const createSickReport = async (payload: any) => {
  const res = await api.post('/v1/sick-report/create', payload);
  return res.data;
};

export const updateSickReport = async (payload: any) => {
  const { id, ...data } = payload;
  const res = await api.patch(`/v1/sick-report/edit/${id}`, data);
  return res.data;
};

export const deleteSickReport = async (id: string | number) => {
  const res = await api.delete(`/v1/sick-report/remove/${id}`);
  return res.data;
};

//DEPARTMENT FILES

export const getDepartmentFiles = async () => {
  const res = await api.get('/v1/department-files');
  return res.data;
};
export const getDepartmentFile = async (id?: number) => {
  const res = await api.get(`/v1/department-files/${id}`);
  return res.data;
};

// WORKING ~~~~~~~~~~~ ###########
export const createDepartmentFile = async (payload: any) => {
  console.log('Final Payload:', payload);
  // const formData = new FormData();

  const res = await api.post('/v1/department-files/create', payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateDepartmentFile = async (payload: any) => {
  const { id, ...data } = payload;
  const res = await api.patch(`/v1/department-files/edit/${id}`, data);
  return res.data;
};

export const deleteDepartmentFile = async (id: string | number) => {
  const res = await api.delete(`/v1/department-files/${id}`);
  return res.data;
};

//VEHICLES INVENTORY

export const getVehicleInventorys = async () => {
  const res = await api.get('/v1/vehicles-inventory');
  return res.data;
};
export const getVehicleInventory = async (id?: number) => {
  const res = await api.get(`/v1/vehicles-inventory/${id}`);
  return res.data;
};

export const createVehicleInventory = async (payload: any) => {
  const res = await api.post('/v1/vehicles-inventory/create', payload);
  return res.data;
};

export const updateVehicleInventory = async (payload: any) => {
  const { id, ...data } = payload;

  const res = await api.patch(`/v1/vehicles-inventory/edit/${id}`, data);
  return res.data;
};

export const deleteVehicleInventory = async (id: string | number) => {
  const res = await api.delete(`/v1/vehicles-inventory/${id}`);
  return res.data;
};

// Equipment/Machine Inventory

export const getEquipmentInventorys = async () => {
  const res = await api.get('/v1/equipment-inventory');
  return res.data;
};
export const getEquipmentInventory = async (id?: number) => {
  const res = await api.get(`/v1/equipment-inventory/${id}`);
  return res.data;
};

export const createEquipmentInventory = async (payload: any) => {
  const res = await api.post('/v1/equipment-inventory/create', payload);
  return res.data;
};

export const updateEquipmentInventory = async (payload: any) => {
  const { id, ...data } = payload;

  const res = await api.patch(`/v1/equipment-inventory/edit/${id}`, data);
  return res.data;
};

export const deleteEquipmentInventory = async (id: string | number) => {
  const res = await api.delete(`/v1/equipment-inventory/${id}`);
  return res.data;
};

//LIBRARY BOOKS:

export const getBooks = async () => {
  const res = await api.get('/v1/library-books');
  return res.data;
};

export const getBooksById = async (id?: string | number) => {
  const res = await api.get(`/v1/library-books/${id}`);
  return res.data;
};

// export const createOfficers = async (payload: any) => {
//   const res = await api.post('/v1/officers/create', payload);
//

export const createBooks = async (payload: CreateOfficerPayload) => {
  console.log('Final Payload:', payload);
  const formData = new FormData();

  // Basic fields
  formData.append('title', payload.title || '');
  formData.append('author', payload.author || '');
  formData.append('isbn', payload.isbn || '');
  formData.append('cateogory', payload.cateogory || '');
  formData.append('language', payload.language || '');
  formData.append('copies', payload.copies || '');
  formData.append('issued_date', payload.issued_date || '');

  if (payload.upload) {
    formData.append('upload', payload.upload);
  }

  const res = await api.post('/v1/library-books/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateBooks = async (payload: CreateOfficerPayload) => {
  const formData = new FormData();

  formData.append('title', payload.title || '');
  formData.append('author', payload.author || '');
  formData.append('isbn', payload.isbn || '');
  formData.append('cateogory', payload.cateogory || '');
  formData.append('language', payload.language || '');
  formData.append('copies', payload.copies || '');
  formData.append('issued_date', payload.issued_date || '');

  if (payload.upload) {
    formData.append('upload', payload.upload);
  }
  // Debug check
  // console.log([...formData.entries()]);
  const { id } = payload;

  const res = await api.patch(`/v1/library-books/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};
export const deleteBooks = async (id: string | number) => {
  const res = await api.delete(`/v1/library-books/edit/${id}`);
  return res.data;
};

//MAIL ARCHIVING:

export const getMailArchives = async () => {
  const res = await api.get('/v1/mail-archiving');
  return res.data;
};

export const getMailArchiveById = async (id?: string | number) => {
  const res = await api.get(`/v1/mail-archiving/${id}`);
  return res.data;
};

export const createMailArchive = async (payload: CreateOfficerPayload) => {
  console.log('Final Payload:', payload);
  const formData = new FormData();

  // Basic fields
  formData.append('file_title', payload.file_title || '');
  formData.append('to_from', payload.to_from || '');
  formData.append('subject', payload.subject || '');
  formData.append('ref_no', payload.ref_no || '');
  formData.append('date_sent', payload.date_sent || '');

  if (payload.upload) {
    formData.append('upload', payload.upload);
  }

  const res = await api.post('/v1/mail-archiving/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateMailArchive = async (payload: CreateOfficerPayload) => {
  const formData = new FormData();

  formData.append('file_title', payload.file_title || '');
  formData.append('to_from', payload.to_from || '');
  formData.append('subject', payload.subject || '');
  formData.append('ref_no', payload.ref_no || '');
  formData.append('date_sent', payload.date_sent || '');

  if (payload.upload?.file) {
    formData.append('upload', payload.upload.file);
  }
  // Debug check
  // console.log([...formData.entries()]);
  const { id } = payload;

  const res = await api.patch(`/v1/mail-archiving/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};
export const deleteMailArchive = async (id: string | number) => {
  const res = await api.delete(`/v1/mail-archiving/remove/${id}`);
  return res.data;
};

//MAMMY MARKET

export const getMammyMarkets = async () => {
  const res = await api.get('/v1/mammy-market');
  return res.data;
};

export const getMammyMarketById = async (id?: string | number) => {
  const res = await api.get(`/v1/mammy-market/${id}`);
  return res.data;
};

export const createMammyMarket = async (payload: CreateOfficerPayload) => {
  console.log('Final Payload:', payload);
  const formData = new FormData();

  // Basic fields
  // formData.append('upload', payload.upload || '');
  formData.append('shop_owner', payload.shop_owner || '');
  formData.append('rentage_fee', payload.rentage_fee || '');
  formData.append('shop_no', payload.shop_no || '');
  formData.append('business_nature', payload.business_nature || '');
  formData.append('phone_number', payload.phone_number || '');
  formData.append('allocation_date', payload.allocation_date || '');

  if (payload.upload) {
    formData.append('upload', payload.upload);
  }

  const res = await api.post('/v1/mammy-market/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateMammyMarket = async (payload: CreateOfficerPayload) => {
  const formData = new FormData();

  formData.append('shop_owner', payload.shop_owner || '');
  formData.append('rentage_fee', payload.rentage_fee || '');
  formData.append('shop_no', payload.shop_no || '');
  formData.append('business_nature', payload.business_nature || '');
  formData.append('phone_number', payload.phone_number || '');
  formData.append('allocation_date', payload.allocation_date || '');

  // if (payload.upload) {
  //   formData.append('upload', payload.upload);
  // }

  if (payload.upload) {
    formData.append('upload', payload.upload);
  }
  // Debug check
  // console.log([...formData.entries()]);
  const { id } = payload;

  const res = await api.patch(`/v1/mammy-market/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};
export const deleteMammyMarket = async (id: string | number) => {
  const res = await api.delete(`/v1/mammy-market/remove/${id}`);
  return res.data;
};

//ACCOMODATIONS

export const getAccomodations = async () => {
  const res = await api.get('/v1/accommodation-returns');
  return res.data;
};
export const getAccomodation = async (id?: number) => {
  const res = await api.get(`/v1/accommodation-returns/${id}`);
  return res.data;
};

export const createAccomodation = async (payload: any) => {
  const res = await api.post('/v1/accommodation-returns/create', payload);
  return res.data;
};

export const updateAccomodation = async (payload: any) => {
  const { id, ...data } = payload;

  const res = await api.patch(`/v1/accommodation-returns/edit/${id}`, data);
  return res.data;
};

export const deleteAccomodation = async (id: string | number) => {
  const res = await api.delete(`/v1/accommodation-returns/${id}`);
  return res.data;
};
//STAFF NOMINAL ROLL

export const getStaffNominals = async () => {
  const res = await api.get('/v1/staff-nominal-roll');
  return res.data;
};
export const getStaffNominal = async (id?: number) => {
  const res = await api.get(`/v1/staff-nominal-roll/${id}`);
  return res.data;
};

export const createStaffNominal = async (payload: any) => {
  const res = await api.post('/v1/staff-nominal-roll/create', payload);
  return res.data;
};

export const updateStaffNominal = async (payload: any) => {
  const { officer_id, ...data } = payload;

  const res = await api.patch(`/v1/staff-nominal-roll/edit/${officer_id}`, data);
  return res.data;
};

export const deleteStaffNominal = async (id: string | number) => {
  const res = await api.delete(`/v1/staff-nominal-roll/${id}`);
  return res.data;
};

//GUARD ROOM

export const getGuardRooms = async () => {
  const res = await api.get('/v1/guard-room');
  return res.data;
};
export const getGuardRoom = async (id?: number) => {
  const res = await api.get(`/v1/guard-room/${id}`);
  return res.data;
};

export const createGuardRoom = async (payload: any) => {
  const res = await api.post('/v1/guard-room/create', payload);
  return res.data;
};

export const updateGuardRoom = async (payload: any) => {
  const { officer_id, ...data } = payload;

  const res = await api.patch(`/v1/guard-room/edit/${officer_id}`, data);
  return res.data;
};

export const deleteGuardRoom = async (id: string | number) => {
  const res = await api.delete(`/v1/guard-room/${id}`);
  return res.data;
};
//SIGNAL FORMS

export const getSignalForms = async () => {
  const res = await api.get('/v1/signal-form');
  return res.data;
};

export const getSignalFormById = async (id?: string | number) => {
  const res = await api.get(`/v1/signal-form/${id}`);
  return res.data;
};

export const createSignalForm = async (payload: any) => {
  const formData = new FormData();

  // Basic fields
  formData.append('drafter_name_in', payload.drafter_name_in || '');
  formData.append('from', payload.from || '');
  formData.append('to', payload.to || '');
  formData.append('info', payload.info || '');
  formData.append('precedence_a_action', payload.precedence_a_action || '');
  formData.append('branch', payload.branch || '');
  formData.append('precedence_info', payload.precedence_info || '');
  formData.append('telephone_number', payload.telephone_number || '');
  formData.append('date_time_group_month', payload.date_time_group_month || '');
  formData.append('dig_serial_no', payload.dig_serial_no || '');
  formData.append('name_in_block_letters', payload.name_in_block_letters || '');
  formData.append('message_instructions', payload.message_instructions || '');
  formData.append('releasing_officer_rank', payload.releasing_officer_rank || '');
  formData.append('security_classification', payload.security_classification || '');
  formData.append('originator_number', payload.originator_number || '');
  formData.append('text', payload.text || '');
  formData.append('internal_distribution', payload.internal_distribution || '');
  formData.append('file_number_or_reference', payload.file_number_or_reference || '');
  formData.append('classification_status', payload.classification_status || '');
  formData.append('page_details', payload.page_details || '');
  formData.append('comm_gen_serial', payload.comm_gen_serial || '');
  formData.append('senior_received', payload.senior_received || '');
  formData.append('system', payload.system || '');
  formData.append('time_in_out', payload.time_in_out || '');

  // File upload
  if (payload.upload) {
    formData.append('upload', payload.upload);
  }

  const res = await api.post('/v1/signal-form/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const updateSignalForm = async (payload: any) => {
  const { id, ...data } = payload;
  const formData = new FormData();

  // Basic fields
  formData.append('drafter_name_in', data.drafter_name_in || '');
  formData.append('from', data.from || '');
  formData.append('to', data.to || '');
  formData.append('info', data.info || '');
  formData.append('precedence_a_action', data.precedence_a_action || '');
  formData.append('branch', data.branch || '');
  formData.append('precedence_info', data.precedence_info || '');
  formData.append('telephone_number', data.telephone_number || '');
  formData.append('date_time_group_month', data.date_time_group_month || '');
  formData.append('dig_serial_no', data.dig_serial_no || '');
  formData.append('name_in_block_letters', data.name_in_block_letters || '');
  formData.append('message_instructions', data.message_instructions || '');
  formData.append('releasing_officer_rank', data.releasing_officer_rank || '');
  formData.append('security_classification', data.security_classification || '');
  formData.append('originator_number', data.originator_number || '');
  formData.append('text', data.text || '');
  formData.append('internal_distribution', data.internal_distribution || '');
  formData.append('file_number_or_reference', data.file_number_or_reference || '');
  formData.append('classification_status', data.classification_status || '');
  formData.append('page_details', data.page_details || '');
  formData.append('comm_gen_serial', data.comm_gen_serial || '');
  formData.append('senior_received', data.senior_received || '');
  formData.append('system', data.system || '');
  formData.append('time_in_out', data.time_in_out || '');

  // File upload
  if (data.upload?.file) {
    formData.append('upload', data.upload.file);
  } else if (data.upload) {
    formData.append('upload', data.upload);
  }

  const res = await api.patch(`/v1/signal-form/edit/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return res.data;
};

export const deleteSignalForm = async (id: string | number) => {
  const res = await api.delete(`/v1/signal-form/remove/${id}`);
  return res.data;
};

// TRIAL FORMS
export const getTrialForms = async () => {
  const res = await api.get('/v1/trial-form');
  return res.data;
};

export const getTrialFormById = async (id?: number | string) => {
  if (!id) return null;
  const res = await api.get(`/v1/trial-form/${id}`);
  return res.data;
};

export const createTrialForm = async (payload: any) => {
  const formData = new FormData();

  // Append all fields from payload
  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const res = await api.post('/v1/trial-form/create', formData);
  return res.data;
};

export const updateTrialForm = async (payload: any) => {
  const formData = new FormData();
  const id = payload.id;

  // Append all fields from payload EXCEPT id
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'id') return; // Skip id field - it goes in the URL

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const res = await api.patch(`/v1/trial-form/edit/${id}`, formData);
  return res.data;
};

export const deleteTrialForm = async (id: string | number) => {
  const res = await api.delete(`/v1/trial-form/remove/${id}`);
  return res.data;
};

// Charge Sheet API Functions
export const getChargeSheets = async () => {
  const res = await api.get('/v1/charge-sheet');
  return res.data.data || res.data;
};

export const getChargeSheetById = async (id: string | number) => {
  const res = await api.get(`/v1/charge-sheet/${id}`);
  return res.data.data || res.data;
};

export const createChargeSheet = async (payload: any) => {
  const formData = new FormData();

  // Append all fields from payload
  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const res = await api.post('/v1/charge-sheet/create', formData);
  return res.data;
};

export const updateChargeSheet = async (payload: any) => {
  const formData = new FormData();
  const id = payload.id;

  // Append all fields from payload EXCEPT id
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'id') return; // Skip id field - it goes in the URL

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  const res = await api.patch(`/v1/charge-sheet/edit/${id}`, formData);
  return res.data;
};

export const deleteChargeSheet = async (id: string | number) => {
  const res = await api.delete(`/v1/charge-sheet/remove/${id}`);
  return res.data;
};
