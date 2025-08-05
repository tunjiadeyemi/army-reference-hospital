import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleSickData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const SickRecord = () => {
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
      key: 'department',
      header: 'Department',
      className: 'w-[10%]'
    },
    {
      key: 'admission',
      header: 'Admission',
      className: 'w-[5%]'
    },
    {
      key: 'sickDays',
      header: 'Sick Leave (No. of Days)',
      className: 'w-[23%]'
    },
    {
      key: 'excuse',
      header: 'Excuse Duty',
      className: 'w-[23%]'
    }
  ];

  const { setSelectedSickRecord, setShowSickModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleSickData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowSickModal(true);
        setSelectedSickRecord(params.row.name);
      }}
    />
  );
};

export default SickRecord;
