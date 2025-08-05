import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleStaffData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const StaffRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'armyNumber',
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
      className: 'w-[20%]'
    },
    {
      key: 'dob',
      header: 'DOB',
      className: 'w-[10%]'
    },
    {
      key: 'maritalStatus',
      header: 'Marital Status',
      className: 'w-[5%]'
    },
    {
      key: 'tradeClass',
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

  return (
    <MainTable
      data={sampleStaffData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowStaffModal(true);
        setSelectedStaffRecord(params.row.name);
      }}
    />
  );
};

export default StaffRecord;
