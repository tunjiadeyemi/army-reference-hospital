import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleGuardData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const GuardRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
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
      key: 'offence',
      header: 'Offence',
      className: 'w-[10%]'
    },
    {
      key: 'dateDetained',
      header: 'Date Detained',
      className: 'w-[5%]'
    },
    {
      key: 'detainedBy',
      header: 'Detained By',
      className: 'w-[23%]'
    },
    {
      key: 'releasedBy',
      header: 'Released By',
      className: 'w-[23%]'
    }
  ];

  const { setSelectedGuardRecord, setShowGuardModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleGuardData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowGuardModal(true);
        setSelectedGuardRecord(params.row.name);
      }}
    />
  );
};

export default GuardRecord;
