export interface SignalFormPayload {
  id?: string | number;
  drafter_name_in: string;
  from: string;
  to: string;
  info: string;
  precedence_a_action: string;
  branch: string;
  precedence_info: string;
  telephone_number: string;
  date_time_group_month: string;
  dig_serial_no: string;
  name_in_block_letters: string;
  message_instructions: string;
  releasing_officer_rank: string;
  security_classification: string;
  originator_number: string;
  text: string;
  internal_distribution: string;
  file_number_or_reference: string;
  classification_status: boolean | string;
  page_details: string;
  comm_gen_serial: string;
  senior_received: string;
  system: string;
  time_in_out: string;
  upload?: File | null;
}

export interface SignalFormResponse {
  id: string | number;
  drafter_name_in: string;
  from: string;
  to: string;
  info: string;
  precedence_a_action: string;
  branch: string;
  precedence_info: string;
  telephone_number: string;
  date_time_group_month: string;
  dig_serial_no: string;
  name_in_block_letters: string;
  message_instructions: string;
  releasing_officer_rank: string;
  security_classification: string;
  originator_number: string;
  text: string;
  internal_distribution: string;
  file_number_or_reference: string;
  classification_status: boolean;
  page_details: string;
  comm_gen_serial: string;
  senior_received: string;
  system: string;
  time_in_out: string;
  upload?: string;
  created_at?: string;
  updated_at?: string;
}
