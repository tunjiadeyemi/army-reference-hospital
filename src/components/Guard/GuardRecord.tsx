import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetGuardRooms } from '../../hooks/dashboardhooks/useDasboardData';

const GuardRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'serviceNumber',
      header: 'Army Number',
      className: 'w-[10%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[10%]'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[10%]'
    },
    {
      key: 'offence',
      header: 'Offence',
      className: 'w-[10%]'
    },
    {
      key: 'date_detained',
      header: 'Date Detained',
      className: 'w-[5%]'
    },
    {
      key: 'detained_by',
      header: 'Detained By',
      className: 'w-[7%]'
    },
    {
      key: 'released_by',
      header: 'Released By',
      className: 'w-[13%]'
    }
  ];

  const { setSelectedGuardRecord, setShowGuardModal } = useContext(AppContext);
  const {data: guardRoomData} = useGetGuardRooms()
  return (
    <MainTable
      data={guardRoomData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowGuardModal(true);
        setSelectedGuardRecord(params.row);
      }}
    />
  );
};

export default GuardRecord;
