import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleMammyData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const MammyRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'shopOwner',
      header: 'Shop Owner',
      className: 'w-[10%]'
    },
    {
      key: 'rentage',
      header: 'Rentage',
      className: 'w-[10%]'
    },
    {
      key: 'shopNumber',
      header: 'Shop Number',
      className: 'w-[10%]'
    },
    {
      key: 'rentageFee',
      header: 'Rentage (Fee)/Month.',
      className: 'w-[5%]',
      render: (_value) => <span>₦{_value}</span>
    },
    {
      key: 'phone',
      header: 'Phone',
      className: 'w-[5%]'
    },
    {
      key: 'businessType',
      header: 'Nature of Business',
      className: 'w-[25%]'
    }
  ];

  const { setSelectedMammyRecord, setShowMammyModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleMammyData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowMammyModal(true);
        setSelectedMammyRecord(params.row.name);
      }}
    />
  );
};

export default MammyRecord;
