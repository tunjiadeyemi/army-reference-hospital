import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleLeaveData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const LeaveRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'armyNumber',
      header: 'Army Number',
      className: 'w-[20%]'
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
      key: 'destination',
      header: 'Destination',
      className: 'w-[10%]'
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-[30%]'
    }
  ];

  const { setSelectedLeaveRecord, setShowLeaveModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleLeaveData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowLeaveModal(true);
        setSelectedLeaveRecord(params.row.name);
      }}
    />
  );
};

export default LeaveRecord;
