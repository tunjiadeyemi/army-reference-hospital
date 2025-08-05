import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleOrderData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const OrderRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[13%]'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[20%]'
    },
    {
      key: 'serviceNumber',
      header: 'Service No.',
      className: 'w-[13%]'
    },
    {
      key: 'decorations',
      header: 'Decorations',
      className: 'w-[13%]'
    },
    {
      key: 'appointment',
      header: 'Appointment',
      className: 'w-[13%]'
    },

    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[13%]'
    },
    {
      key: 'date',
      header: 'Date',
      className: 'w-[13%]'
    },
    {
      key: 'issueNo',
      header: 'Issue No.',
      className: 'w-[13%]'
    }
  ];

  const { setSelectedRecord, setShowRecordModal } = useContext(AppContext);

  console.log('sampleOrderData', sampleOrderData);

  return (
    <MainTable
      data={sampleOrderData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowRecordModal(true);
        setSelectedRecord(params.row.name);
      }}
    />
  );
};

export default OrderRecord;
