import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
// import { sampleUnitData } from '../../utils/constants';

const UnitRecord = () => {
  const sampleUnitData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  ltrOfReg: 100,
  auth: 'Major',
  wynType: 500,
  country: 'Nigeria',
  regNo: `NA657880${index + 1}`,
  buttNo: `${index + 1}775NB`
}));

  
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'ltrOfReg',
      header: 'Ltr of Reg',
      className: 'w-[10%]'
    },
    {
      key: 'auth',
      header: 'Auth',
      className: 'w-[10%]'
    },
    {
      key: 'wynType',
      header: 'Wyn Type',
      className: 'w-[10%]'
    },
    {
      key: 'country',
      header: 'Country of Origin ',
      className: 'w-[20%]'
    },
    {
      key: 'regNo',
      header: 'Reg No',
      className: 'w-[10%]'
    },
    {
      key: 'buttNo',
      header: 'Butt No',
      className: 'w-[20%]'
    }
  ];

  const { setSelectedUnitRecord, setShowUnitModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleUnitData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowUnitModal(true);
        setSelectedUnitRecord(params.row.name);
      }}
    />
  );
};

export default UnitRecord;
