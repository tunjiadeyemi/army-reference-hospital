import api from '../api';

export interface RoutineActivity {
  time: string;
  activity: string;
  days: string[];
}

export interface CreatePartOneOrderPayload {
  officer_id: string | number;
  appointment: string;
  decorations: string;
  rank?: string;
  serviceNumber?: string;
  name?: string;
  fireDuration?: string;
  fireLocation?: string;
  fireServiceNo?: string;
  fireName?: string;
  timeOutName?: string;
  //   timeOutName: string,
  timeOutRank?: string;
  timeOutAppt?: string;
  dutyRank?: string;
  dutyServiceNo?: string;
  dutyName?: string;
  unit: string;
  issueNo: string;
  date: string;
  routineActivities: RoutineActivity[];
  dutyDepartment: string;
  dutyDate: string;
  duty_officer_id: string | number;
  dutyDurationHours: number;
  dutyLocation: string;
  guard_officer_id: string | number;
  subject: string;
  comment: string;
  timeOut: string;
  signedName: string;
  signedRank: string;
  signedAppt: string;
}

export interface CreatePartOneOrderResponse {
  id: number;
  // ...other fields as returned by backend
}

export const createPartOneOrder = async (
  payload: CreatePartOneOrderPayload
): Promise<CreatePartOneOrderResponse> => {
  const { data } = await api.post<CreatePartOneOrderResponse>('/v1/part1-order/create', payload);
  return data;
};
