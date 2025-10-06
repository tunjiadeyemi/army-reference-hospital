// import { handleApi } from "../../utils/apiHelper";
import type { CreateOfficerPayload } from '../../utils/types/unitBible';
import api from '../api';


const convertToCustomDate = (date: string | Date | undefined): string => {
  if (!date) return "";

  // If it's already a Date object
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Handle string in DD/MM/YYYY format
  const parts = date.split("/");

  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // If it’s already a standard ISO or other recognizable format
  const parsed = new Date(date);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return "";
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
  console.log("Final Payload:", payload)
  const formData = new FormData();

  // Basic fields
  formData.append("name", payload.name || "");
  formData.append("email", payload.email || "");
  formData.append("rank", payload.rank || "");
  formData.append("serviceNumber", payload.serviceNumber || "");
  formData.append("corps", payload.corps || "");
  formData.append("qualification", payload.qualification || "");
  formData.append("qualificationTrade", payload.qualification || "");

  // Dates
  formData.append("dateOfBirth", convertToCustomDate (payload.dateOfBirth));
  formData.append("dateOfCommission", convertToCustomDate (payload.dateOfCommission));
  formData.append("dateOfLastPromotion", convertToCustomDate (payload.dateOfLastPromotion));
  formData.append("dateOfPostedIn", convertToCustomDate (payload.dateOfPostedIn));
  formData.append("dateOfTakingStrength", convertToCustomDate (payload.dateOfTakingStrength));

  // Other details
  formData.append("directorate", payload.directorate || "");
  formData.append("sex", payload.sex || "");
  formData.append("bloodGroup", payload.bloodGroup || "");
  formData.append("genotype", payload.genotype || "");
  formData.append("religion", payload.religion || "");
  formData.append("maritalStatus", payload.maritalStatus || "");
  formData.append("phoneNumber", payload.phoneNumber || "");
  formData.append("placeOfBirth", payload.placeOfBirth || "");
  formData.append("stateOfOrigin", payload.stateOfOrigin || "");
  formData.append("lga", payload.lga || "");

  // Address
  formData.append("permanentAddress", payload.permanentAddress || "");
  formData.append("permanentHomeAddress", payload.permanentAddress || "");
  formData.append("emailAddress", payload.emailAddress || "");

  // Family info
  formData.append("numberOfChildren", String(payload.numberOfChildren || 0));
  formData.append("numberOfWives", String(payload.numberOfWives || 0));
  formData.append("nameOfChildren", JSON.stringify(payload.nameOfChildren || []));
  formData.append("nameOfWives", JSON.stringify(payload.nameOfWives || []));

  // Next of kin (mapped to backend expectations)
  formData.append("nameOfNextOfKin", payload.nameOfNextOfKin || "");
  formData.append("nextOfKinName", payload.nameOfNextOfKin || "");
  formData.append("relationshipWithNextOfKin", payload.relationshipWithNextOfKin || "");
  formData.append("nextOfKinRelationship", payload.relationshipWithNextOfKin || "");
  formData.append("addressOfNextOfKin", payload.addressOfNextOfKin || "");
  formData.append("nextOfKinAddress", payload.addressOfNextOfKin || "");
  formData.append("phoneNumberOfNextOfKin", payload.phoneNumberOfNextOfKin || "");
  formData.append("nextOfKinPhoneNumber", payload.phoneNumberOfNextOfKin || "");

  // Additional info
  formData.append("honourAndAward", payload.honourAndAward || "");
  formData.append("operations",  "");
  formData.append("lastThreeUnits", "");
  formData.append("remarks", payload.remarks || "");

  
  if (payload.photo?.file) {
    formData.append("photo", payload.photo.file);
  }

  // Debug check
  // console.log([...formData.entries()]);

  const res = await api.post("/v1/officers/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateOfficer = async (payload: CreateOfficerPayload) => {
  const formData = new FormData();

  // Basic fields
  formData.append("name", payload.name || "");
  formData.append("email", payload.email || "");
  formData.append("rank", payload.rank || "");
  formData.append("serviceNumber", payload.serviceNumber || "");
  formData.append("corps", payload.corps || "");
  formData.append("qualification", payload.qualification || "");
  formData.append("qualificationTrade", payload.qualification || "");

  // Dates
  formData.append("dateOfBirth", convertToCustomDate (payload.dateOfBirth));
  formData.append("dateOfCommission", convertToCustomDate (payload.dateOfCommission));
  formData.append("dateOfLastPromotion", convertToCustomDate (payload.dateOfLastPromotion));
  formData.append("dateOfPostedIn", convertToCustomDate (payload.dateOfPostedIn));
  formData.append("dateOfTakingStrength", convertToCustomDate (payload.dateOfTakingStrength));

  // Other details
  formData.append("directorate", payload.directorate || "");
  formData.append("sex", payload.sex || "");
  formData.append("bloodGroup", payload.bloodGroup || "");
  formData.append("genotype", payload.genotype || "");
  formData.append("religion", payload.religion || "");
  formData.append("maritalStatus", payload.maritalStatus || "");
  formData.append("phoneNumber", payload.phoneNumber || "");
  formData.append("placeOfBirth", payload.placeOfBirth || "");
  formData.append("stateOfOrigin", payload.stateOfOrigin || "");
  formData.append("lga", payload.lga || "");

  // Address
  formData.append("permanentAddress", payload.permanentAddress || "");
  formData.append("permanentHomeAddress", payload.permanentAddress || "");
  formData.append("emailAddress", payload.emailAddress || "");

  // Family info
  formData.append("numberOfChildren", String(payload.numberOfChildren || 0));
  formData.append("numberOfWives", String(payload.numberOfWives || 0));
  formData.append("nameOfChildren", JSON.stringify(payload.nameOfChildren || []));
  formData.append("nameOfWives", JSON.stringify(payload.nameOfWives || []));

  // Next of kin (mapped to backend expectations)
  formData.append("nameOfNextOfKin", payload.nameOfNextOfKin || "");
  formData.append("nextOfKinName", payload.nameOfNextOfKin || "");
  formData.append("relationshipWithNextOfKin", payload.relationshipWithNextOfKin || "");
  formData.append("nextOfKinRelationship", payload.relationshipWithNextOfKin || "");
  formData.append("addressOfNextOfKin", payload.addressOfNextOfKin || "");
  formData.append("nextOfKinAddress", payload.addressOfNextOfKin || "");
  formData.append("phoneNumberOfNextOfKin", payload.phoneNumberOfNextOfKin || "");
  formData.append("nextOfKinPhoneNumber", payload.phoneNumberOfNextOfKin || "");

  // Additional info
  formData.append("honourAndAward", payload.honourAndAward || "");
  formData.append("operations",  "");
  formData.append("lastThreeUnits", "");
  formData.append("remarks", payload.remarks || "");

  
  if (payload.photo?.file) {
    formData.append("photo", payload.photo.file);
  }

  // Debug check
  // console.log([...formData.entries()]);
   const {id} = payload; 

  const res = await api.patch(`/v1/officers/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
  const {id, ...data} = payload
  const res = await api.patch(`/v1/ammunitions/create/${id}`, data)
  return res.data
}

export const deleteArm = async (id: string | number) => {
  const res = await api.delete(`/v1/ammunitions/remove/${id}`);
  return res.data;
};


//SICK REPORT

export const getSickReports = async () => {
  const res = await api.get('/v1/sick-report');
  return res.data;
};
export const getSickReport= async (id?: number) => {
  const res = await api.get(`/v1/sick-report/${id}`);
  return res.data;
};

export const createSickReport = async (payload: any) => {
  const res = await api.post('/v1/sick-report/create', payload);
  return res.data;
};

export const updateSickReport = async (payload: any) => {
  const {id, ...data} = payload
  const res = await api.patch(`/v1/sick-report/edit/${id}`, data)
  return res.data
}

export const deleteSickReport = async (id: string | number) => {
  const res = await api.delete(`/v1/sick-report/remove/${id}`);
  return res.data;
};

//DEPARTMENT FILES




export const getDepartmentFiles = async () => {
  const res = await api.get('/v1/department-files');
  return res.data;
};
export const getDepartmentFile= async (id?: number) => {
  const res = await api.get(`/v1/department-files/${id}`);
  return res.data;
};

export const createDepartmentFile = async (payload: any) => {
  const res = await api.post('/v1/department-files', payload);
  return res.data;
};

export const updateDepartmentFile = async (payload: any) => {
  const {id, ...data} = payload
  const res = await api.patch(`/v1/department-files/${id}`, data)
  return res.data
}

export const deleteDepartmentFile = async (id: string | number) => {
  const res = await api.delete(`/v1/department-files/${id}`);
  return res.data;
};

//VEHICLES INVENTORY


export const getVehicleInventorys = async () => {
  const res = await api.get('/vehicles-inventory');
  return res.data;
};
export const getVehicleInventory = async (id?: number) => {
  const res = await api.get(`/vehicles-inventory/${id}`);
  return res.data;
};

export const createVehicleInventory = async (payload: any) => {
  const res = await api.post('/vehicles-inventory', payload);
  return res.data;
};

export const updateVehicleInventory = async (payload: any) => {
  const {id, ...data} = payload

  const res = await api.patch(`/vehicles-inventory/${id}`, data)
  return res.data
}

export const deleteVehicleInventory = async (id: string | number) => {
  const res = await api.delete(`/vehicles-inventory/${id}`);
  return res.data;
};



