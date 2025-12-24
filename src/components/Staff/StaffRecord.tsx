import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetStaffNominals } from '../../hooks/dashboardhooks/useDasboardData';

const StaffRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'serviceNumber',
      header: 'Army Number',
      className: 'w-[15%]'
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
      key: 'date_of_birth',
      header: 'DOB',
      className: 'w-[10%]'
    },
    {
      key: 'marital_status',
      header: 'Marital Status',
      className: 'w-[15%]'
    },
    {
      key: 'trade_class',
      header: 'Trade Class',
      className: 'w-[23%]'
    },
    {
      key: 'doe',
      header: 'DOE',
      className: 'w-[23%]'
    }
  ];

  const { setSelectedStaffRecord, setShowStaffModal } = useContext(AppContext);
  const {data: staffNominals} = useGetStaffNominals()
  

  return (
    <MainTable
      data={staffNominals}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowStaffModal(true);
        setSelectedStaffRecord(params.row);
      }}
    />
  );
};

export default StaffRecord;
