import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
// import { sampleEquipmentData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetEquipmentInventorys } from '../../hooks/dashboardhooks/useDasboardData';

const EquipmentRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'eq_name',
      header: 'Equipment/Machine Name',
      className: 'w-[10%]'
    },
    {
      key: 'function_status',
      header: 'Function Status',
      className: 'w-[10%]'
    },
    {
      key: 'year_of_purchase',
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
  const { data: eqInventory} = useGetEquipmentInventorys();
  
  return (
    <MainTable
      data={eqInventory}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowEquipmentModal(true);
        setSelectedEquipmentRecord(params.row);
      }}
    />
  );
};

export default EquipmentRecord;
