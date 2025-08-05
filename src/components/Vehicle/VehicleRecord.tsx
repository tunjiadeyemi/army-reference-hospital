import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleVehicleData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const VehicleRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'type',
      header: 'Type/Model',
      className: 'w-[10%]'
    },
    {
      key: 'chassis',
      header: 'Chassis Number',
      className: 'w-[10%]'
    },
    {
      key: 'engine',
      header: 'Engine Number',
      className: 'w-[10%]'
    },
    {
      key: 'year',
      header: 'Year of Make',
      className: 'w-[20%]'
    },
    {
      key: 'serviceability',
      header: 'Serviceability',
      className: 'w-[10%]'
    },
    {
      key: 'yearIssued',
      header: 'Year Issued',
      className: 'w-[20%]'
    }
  ];

  const { setSelectedVehicleRecord, setShowVehicleModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleVehicleData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowVehicleModal(true);
        setSelectedVehicleRecord(params.row.name);
      }}
    />
  );
};

export default VehicleRecord;
