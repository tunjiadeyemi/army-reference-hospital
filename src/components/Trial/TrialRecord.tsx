import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleTrialData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const TrialRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'accusedNumber',
      header: "Accused's Number",
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
      key: 'unit',
      header: 'Unit',
      className: 'w-[10%]'
    }
  ];

  const { setSelectedTrialRecord, setShowTrialModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleTrialData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowTrialModal(true);
        setSelectedTrialRecord(params.row.name);
      }}
    />
  );
};

export default TrialRecord;
