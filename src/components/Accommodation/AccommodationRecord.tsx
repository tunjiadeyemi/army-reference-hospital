import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleAccommodationData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const AccommodationRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'armyNumber',
      header: 'Army Number',
      className: 'w-[10%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[20%]'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[10%]'
    },
    {
      key: 'blockNo',
      header: 'Block No.',
      className: 'w-[5%]'
    },
    {
      key: 'roomNo',
      header: 'Room No.',
      className: 'w-[5%]'
    },
    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[5%]'
    },
    {
      key: 'remarks',
      header: 'Remarks',
      className: 'w-[5%]'
    }
  ];

  const { setSelectedAccommodationRecord, setShowAccommodationModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleAccommodationData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowAccommodationModal(true);
        setSelectedAccommodationRecord(params.row.name);
      }}
    />
  );
};

export default AccommodationRecord;
