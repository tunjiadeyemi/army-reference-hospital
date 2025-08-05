import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleOrderTwoData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const OrderRecordTwo = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'no',
      header: 'S/N',
      className: 'w-[13%]'
    },
    {
      key: 'officer',
      header: 'Part 11 Order(Officer)',
      className: 'w-[20%]'
    },
    {
      key: 'issueNo',
      header: 'Issue No.',
      className: 'w-[13%]'
    },
    {
      key: 'date',
      header: 'Date',
      className: 'w-[13%]'
    },
    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[13%]'
    },
    {
      key: 'sheetNumber',
      header: 'Sheet No.',
      className: 'w-[13%]'
    }
  ];

  const { setSelectedRecordTwo, setShowRecordModalTwo } = useContext(AppContext);

  return (
    <MainTable
      data={sampleOrderTwoData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowRecordModalTwo(true);
        setSelectedRecordTwo(params.row.officer);
      }}
    />
  );
};

export default OrderRecordTwo;
