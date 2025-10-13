import { useContext, useEffect } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import {  useGetUnitHoldingArms } from '../../hooks/dashboardhooks/useDasboardData';
// import { sampleUnitData } from '../../utils/constants';

const UnitHoldingRecord = () => {
  // const sampleUnitData: any[] = Array.from({ length: 50 }, (_, index) => ({
  //   sn: index + 1,
  //   ltrOfReg: 100,
  //   auth: 'Major',
  //   wynType: 500,
  //   country: 'Nigeria',
  //   regNo: `NA657880${index + 1}`,
  //   buttNo: `${index + 1}775NB`
  // }));

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'ltr_of_req',
      header: 'Ltr of Reg',
      className: 'w-[10%]'
    },
    {
      key: 'auth',
      header: 'Auth',
      className: 'w-[10%]'
    },
    {
      key: 'wpn_type',
      header: 'Wpn Type',
      className: 'w-[15%]'
    },
    {
      key: 'country_of_origin',
      header: 'Country of Origin',
      className: 'w-[20%]'
    },
    {
      key: 'reg_no',
      header: 'Reg No',
      className: 'w-[10%]'
    },
    {
      key: 'butt_no',
      header: 'Butt No',
      className: 'w-[20%]'
    }
  ];

  const { setSelectedUnitRecord, setShowUnitHoldingModal } = useContext(AppContext);

  const { data: unitHoldingArms, refetch: refetchUnitHoldingArms } = useGetUnitHoldingArms();
  
    useEffect(() => {
      refetchUnitHoldingArms();
    }, [refetchUnitHoldingArms]);
  return (
    <MainTable
      data={unitHoldingArms}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowUnitHoldingModal(true);
        setSelectedUnitRecord(params.row);
        
      }}
    />
  );
};

export default UnitHoldingRecord;
