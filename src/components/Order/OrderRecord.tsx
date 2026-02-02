import { useContext } from 'react';
import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import type { MainTableColumn } from '../../utils/types/department';
import api from '../../services/api';
import { useQuery } from '@tanstack/react-query';

// --- API and mapping types ---
type PartOneOrderApi = {
  // Core identifiers
  id: number;

  // Officer (creator)
  officer_name: string;
  officer_rank: string;
  officer_number: string;

  // Order details
  appointment: string;
  decorations: string;
  unit: string;
  issueNo: string;
  date: string;

  // Routine activities
  routineActivities: {
    id: number;
    time: string;
    activity: string;
    days: string[];
  }[];

  // Duty details
  dutyDepartment: string;
  dutyDate: string;
  dutyDurationHours: number;
  dutyLocation: string;

  // Order content
  subject: string;
  comment: string;

  // Time out / signing
  timeOut: string;
  signedName: string;
  signedRank: string;
  signedAppt: string;

  // Duty officer
  duty_officer_name: string;
  duty_officer_rank: string;
  duty_officer_number: string;

  // Guard officer
  guard_officer_name: string;
  guard_officer_rank: string;
  guard_officer_number: string;
};


type OrderTableRow = {
  rank: string;
  name: string;
  serviceNumber: string;
  decorations: string;
  appointment: string;
  unit: string;
  date: string;
  issueNo: string;
};

const columns: MainTableColumn<OrderTableRow>[] = [
  { key: 'rank', header: 'Rank', className: 'w-[13%]' },
  { key: 'name', header: 'Name', className: 'w-[20%]' },
  { key: 'serviceNumber', header: 'Service No.', className: 'w-[13%]' },
  { key: 'decorations', header: 'Decorations', className: 'w-[13%]' },
  { key: 'appointment', header: 'Appointment', className: 'w-[13%]' },
  { key: 'unit', header: 'Unit', className: 'w-[13%]' },
  { key: 'date', header: 'Date', className: 'w-[13%]' },
  { key: 'issueNo', header: 'Issue No.', className: 'w-[13%]' }
];

const fetchOrders = async (): Promise<OrderTableRow[]> => {
  const { data } = await api.get<PartOneOrderApi[]>('/v1/part1-order');

  return data.map((item) => ({
    // identifiers
    id: item.id,

    // table-visible fields
    rank: item.officer_rank,
    name: item.officer_name,
    serviceNumber: item.officer_number,
    decorations: item.decorations,
    appointment: item.appointment,
    unit: item.unit,
    date: item.date,
    issueNo: item.issueNo,

    // routine & duty info (used outside table)
    routineActivities: item.routineActivities,
    dutyDepartment: item.dutyDepartment,
    dutyDate: item.dutyDate,
    dutyDurationHours: item.dutyDurationHours,
    dutyLocation: item.dutyLocation,

    // duty officer
    duty_officer_name: item.duty_officer_name,
    duty_officer_rank: item.duty_officer_rank,
    duty_officer_number: item.duty_officer_number,

    // guard officer
    guard_officer_name: item.guard_officer_name,
    guard_officer_rank: item.guard_officer_rank,
    guard_officer_number: item.guard_officer_number,

    // order metadata
    subject: item.subject,
    comment: item.comment,
    timeOut: item.timeOut,

    // sign-off
    signedName: item.signedName,
    signedRank: item.signedRank,
    signedAppt: item.signedAppt,
  }));
};


const OrderRecord = () => {
  const { setSelectedRecord, setShowRecordModal } = useContext(AppContext);

  const {
    data: tableData = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['part1-order'],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Loading and error handling
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-500">Loading orders...</div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center py-12 text-red-500">
        Failed to load orders.
        <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <MainTable
      data={tableData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        setShowRecordModal(true);
        setSelectedRecord(params.row);
      }}
    />
  );
};

export default OrderRecord;
