export interface DutyPost {
  id: number;
  name: string;
  dayHours: string;
  nightHours: string;
}

export interface OfficerData {
  pNo: string;
  rank: string;
  name: string;
  department?: string;
  timeReportedForDuty?: string;
  timeReportedFieldOfficer?: string;
  date: string;
  signature: File | null;
  comments: string;
  recommendations?: string;
}

export interface FormData {
  name?: string;
  dutyOfficer: OfficerData;
  fieldOfficer: OfficerData;
  coAdmin: OfficerData;
  cmd: OfficerData;
  dutyPosts: DutyPost[];
  dateCreated?: string;
  timeCreated?: string;
}
