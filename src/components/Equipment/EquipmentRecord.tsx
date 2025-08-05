import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleEquipmentData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const EquipmentRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'name',
      header: 'Equipment/Machine Name',
      className: 'w-[10%]'
    },
    {
      key: 'status',
      header: 'Function Status',
      className: 'w-[10%]'
    },
    {
      key: 'year',
      header: 'Year of Purchased or Supplied',
      className: 'w-[20%]'
    },
    {
      key: 'remark',
      header: 'Remark',
      className: 'w-[10%]'
    }
  ];

  const { setSelectedEquipmentRecord, setShowEquipmentModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleEquipmentData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowEquipmentModal(true);
        setSelectedEquipmentRecord(params.row.name);
      }}
    />
  );
};

export default EquipmentRecord;
