import { useState } from 'react';

// Type for your form data structure
export interface BiodataFormData {
  name: string;
  pno: string;
  rank: string;
  corps: string;
  qualification: string;
  dateOfBirth: string;
  directorate: string;
  dateOfCommission: string;
  sex: string;
  bloodGroup: string;
  genotype: string;
  dateOfCommission2: string;
  dateOfLastPromotion: string;
  dateOfTakingStrength: string;
  religion: string;
  dateOfPostedIn: string;
  maritalStatus: string;
  phoneNumber: string;
  placeOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  permanentAddress: string;
  photo: any;
  emailAddress: string;
  numberOfChildren: string;
  numberOfWives: string;
  nameOfChildren: string[];
  nameOfWives: string[];
  nameOfNextOfKin: string;
  relationshipWithNextOfKin: string;
  addressOfNextOfKin: string;
  phoneNumberOfNextOfKin: string;
  honourAndAward: string;
  operations: Array<{
    operation: string;
    date: string;
    location: string;
  }>;
  lastThreeUnits: {
    a: string;
    b: string;
    c: string;
  };
  remarks: string;
}

interface UseFormChangeHandlerReturn<T> {
  formData: T;
  handleInputChange: (field: string, value: any) => void;

  updateChildName: (index: number, value: string) => void;
  updateWifeName: (index: number, value: string) => void;
  addChild: () => void;
  addWife: () => void;
  updateOperation: (index: number, field: 'operation' | 'date' | 'location', value: string) => void;
  addOperation: () => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  resetForm: () => void;
}

function useFormChangeHandler<T extends Record<string, any>>(
  initialState: T
): UseFormChangeHandlerReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);

  // Generic input change handler
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle simple input changes from events
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };
  const handleFileChange = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        [field]: base64String, // Store as base64 string
      }));
    };
    reader.readAsDataURL(file);
  };






  // Array handlers for children names
  const updateChildName = (index: number, value: string) => {
    setFormData((prev) => {
      const newChildren = [...(prev.nameOfChildren as string[])];
      newChildren[index] = value;
      return { ...prev, nameOfChildren: newChildren };
    });
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      nameOfChildren: [...(prev.nameOfChildren as string[]), '']
    }));
  };

  // Array handlers for wives names
  const updateWifeName = (index: number, value: string) => {
    setFormData((prev) => {
      const newWives = [...(prev.nameOfWives as string[])];
      newWives[index] = value;
      return { ...prev, nameOfWives: newWives };
    });
  };

  const addWife = () => {
    setFormData((prev) => ({
      ...prev,
      nameOfWives: [...(prev.nameOfWives as string[]), '']
    }));
  };

  // Array handlers for operations
  const updateOperation = (
    index: number,
    field: 'operation' | 'date' | 'location',
    value: string
  ) => {
    setFormData((prev) => {
      const newOperations = [...(prev.operations as Array<any>)];
      newOperations[index] = {
        ...newOperations[index],
        [field]: value
      };
      return { ...prev, operations: newOperations };
    });
  };

  const addOperation = () => {
    setFormData((prev) => ({
      ...prev,
      operations: [...(prev.operations as Array<any>), { operation: '', date: '', location: '' }]
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleInputChange,
    handleChange,
    updateChildName,
    handleFileChange,
    updateWifeName,
    addChild,
    addWife,
    updateOperation,
    addOperation,
    setFormData,
    resetForm
  } as UseFormChangeHandlerReturn<T>;
}
export default useFormChangeHandler;

export function transformBiodataForAPI(formData: BiodataFormData) {
  // Helper to convert DD/MM/YY to ISO date format (YYYY-MM-DD)
  const convertToISODate = (dateStr: string): string => {
    if (!dateStr) return '';

    // If already in ISO format, return as is
    if (dateStr.includes('-') && dateStr.length >= 10) return dateStr;

    // Parse DD/MM/YY format
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      // Assume 20xx for 2-digit years
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return dateStr;
  };
  return {
   // Basic info - map to backend field names
   photo: formData.photo,
    name: formData.name,
    serviceNumber: formData.pno, // pno → serviceNumber
    rank: formData.rank,
    corps: formData.corps,
    qualification: formData.qualification,
    qualificationTrade: formData.qualification, // Backend expects this field
    
    // Dates - convert to ISO format
    dateOfBirth: convertToISODate(formData.dateOfBirth),
    dateOfCommission: convertToISODate(formData.dateOfCommission),
    dateOfLastPromotion: convertToISODate(formData.dateOfLastPromotion),
    dateOfPostedIn: convertToISODate(formData.dateOfPostedIn),
    dateOfTakingStrength: convertToISODate(formData.dateOfTakingStrength),
    
    // Other fields
    directorate: formData.directorate,
    sex: formData.sex,
    bloodGroup: formData.bloodGroup,
    genotype: formData.genotype,
    religion: formData.religion,
    maritalStatus: formData.maritalStatus,
    phoneNumber: formData.phoneNumber,
    placeOfBirth: formData.placeOfBirth,
    stateOfOrigin: formData.stateOfOrigin,
    lga: formData.lga,
    
    // Address fields
    permanentAddress: formData.permanentAddress,
    permanentHomeAddress: formData.permanentAddress, // Backend expects this field
    emailAddress: formData.emailAddress,
    
    // Family info
    numberOfChildren: formData.numberOfChildren,
    numberOfWives: formData.numberOfWives,
    nameOfChildren: formData.nameOfChildren,
    nameOfWives: formData.nameOfWives,
    
    // Next of kin - map to backend field names
    nameOfNextOfKin: formData.nameOfNextOfKin,
    nextOfKinName: formData.nameOfNextOfKin, // Backend expects this field
    relationshipWithNextOfKin: formData.relationshipWithNextOfKin,
    nextOfKinRelationship: formData.relationshipWithNextOfKin, // Backend expects this field
    addressOfNextOfKin: formData.addressOfNextOfKin,
    nextOfKinAddress: formData.addressOfNextOfKin, // Backend expects this field
    phoneNumberOfNextOfKin: formData.phoneNumberOfNextOfKin,
    nextOfKinPhoneNumber: formData.phoneNumberOfNextOfKin, // Backend expects this field
    
    // Other info
    honourAndAward: formData.honourAndAward,
    operations: formData.operations,
    lastThreeUnits: formData.lastThreeUnits,
    remarks: formData.remarks, };
}

