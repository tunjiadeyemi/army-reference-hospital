/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormData {
  image: string;
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
  operations: Array<{ operation: string; date: string; location: string }>;
  lastThreeUnits: { a: string; b: string; c: string };
  remarks: string;
  [key: string]: any;
}
export interface CreateOfficerPayload {
  image: string;
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
  operations: Array<{ operation: string; date: string; location: string }>;
  lastThreeUnits: { a: string; b: string; c: string };
  remarks: string;
  [key: string]: any;
}

export interface Officer {
  id: string | number ;
  name: string;
  serviceNumber: string;
  rank: string;
  corps: string;
  qualificationTrade: string;
  dateOfBirth: string;
  directorate: string;
  dateOfCommission: string;
  sex: string;
  bloodGroup: string;
  genotype: string;
  dateOfLastPromotion: string;
  dateOfTakingOnStrength: string;
  dateOfPostedIn: string;
  religion: string;
  maritalStatus: string;
  phoneNumber: string;
  placeOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  permanentHomeAddress: string;
  emailAddress: string;
  numberOfWives: string;
  nextOfKinName: string;
  nextOfKinRelationship: string;
  nextOfKinAddress: string;
  nextOfKinPhoneNumber: string;
  honourAndAward: string;
  signature: string;
  photo: string;
  remarks: string;
}

export interface OfficerResponse {
  id: string;
  name: string;
  rank: string;
  badge: string;
  department: string;
}

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
