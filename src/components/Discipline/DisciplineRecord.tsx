import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleDisciplineData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const DisciplineRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'drafterName',
      header: 'Drafter Name',
      className: 'w-[20%]'
    },
    {
      key: 'from',
      header: 'From',
      className: 'w-[10%]'
    },
    {
      key: 'to',
      header: 'To',
      className: 'w-[20%]'
    },
    {
      key: 'branch',
      header: 'Branch',
      className: 'w-[10%]'
    }
  ];

  const { setSelectedDisciplineRecord, setShowDisciplineModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleDisciplineData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowDisciplineModal(true);
        setSelectedDisciplineRecord(params.row.name);
      }}
    />
  );
};

export default DisciplineRecord;
