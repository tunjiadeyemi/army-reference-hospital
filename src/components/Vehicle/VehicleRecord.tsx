import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
// import { sampleVehicleData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetVehicleInventorys } from '../../hooks/dashboardhooks/useDasboardData';


const VehicleRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'type_model',
      header: 'Type/Model',
      className: 'w-[10%]'
    },
    {
      key: 'chassis_number',
      header: 'Chassis Number',
      className: 'w-[10%]'
    },
    {
      key: 'engine_number',
      header: 'Engine Number',
      className: 'w-[10%]'
    },
    {
      key: 'year_of_make',
      header: 'Year of Make',
      className: 'w-[20%]'
    },
    {
      key: 'serviceability_state',
      header: 'Serviceability',
      className: 'w-[10%]'
    },
    {
      key: 'year_issued',
      header: 'Year Issued',
      className: 'w-[20%]'
    }
  ];
   const { data: vehicleInventory} = useGetVehicleInventorys();

  const { setSelectedVehicleRecord, setShowVehicleModal } = useContext(AppContext);

  return (
    <MainTable
      data={vehicleInventory}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowVehicleModal(true);
        setSelectedVehicleRecord(params.row);
      }}
    />
  );
};

export default VehicleRecord;
