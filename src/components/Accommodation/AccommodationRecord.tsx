import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetAccomodations } from '../../hooks/dashboardhooks/useDasboardData';

const AccommodationRecord = () => {
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
      className: 'w-[5%]'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[5%]'
    },
    {
      key: 'block_no',
      header: 'Block No.',
      className: 'w-[5%]'
    },
    {
      key: 'room_no',
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
 const {data: accommodations} = useGetAccomodations()
  return (
    <MainTable
      data={accommodations}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowAccommodationModal(true);
        setSelectedAccommodationRecord(params.row);
      }}
    />
  );
};

export default AccommodationRecord;
