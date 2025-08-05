import { useContext } from 'react';
import { sampleDutyReportData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';

const RecordList: React.FC = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'no',
      header: 'P/No',
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[20%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[13%]'
    },
    {
      key: 'department',
      header: 'Department',
      className: 'w-20'
    },
    {
      key: 'timeReported',
      header: 'Time Reported For Duty',
      className: 'w-[20%]'
    },
    {
      key: 'timeFieldOfficer',
      header: 'Time Reported Field Officer Time',
      className: 'w-[30%]'
    }
  ];

  const { setShowDutyReportModal, setSelectedDutyReport } = useContext(AppContext);

  return (
    <MainTable
      data={sampleDutyReportData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowDutyReportModal(true);
        setSelectedDutyReport(params.row.fileNumber);
      }}
    />
  );
};

export default RecordList;
