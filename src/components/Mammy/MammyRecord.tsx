import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetMammyMarkets } from '../../hooks/dashboardhooks/useDasboardData';

const MammyRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'shop_owner',
      header: 'Shop Owner',
      className: 'w-[15%]'
    },
    {
      key: 'business_nature',
      header: 'Nature of Business',
      className: 'w-[20%]'
    },
    {
      key: 'shop_no',
      header: 'Shop Number',
      className: 'w-[15%]'
    },
    {
      key: 'rentage_fee',
      header: 'Rentage (Fee)/Month.',
      className: 'w-[5%]',
      render: (_value) => <span>₦{_value}</span>
    },
    {
      key: 'phone_number',
      header: 'Phone',
      className: 'w-[5%]'
    },
    {
      key: 'allocation_date',
      header: 'Nature of Business',
      className: 'w-[25%]'
    }
  ];

  const { setSelectedMammyRecord, setShowMammyModal } = useContext(AppContext);
 const {data: mammyData} = useGetMammyMarkets()
  return (
    <MainTable
      data={mammyData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowMammyModal(true);
        setSelectedMammyRecord(params.row);
      }}
    />
  );
};

export default MammyRecord;
