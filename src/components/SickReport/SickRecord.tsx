import { useContext, useEffect, useMemo } from 'react';
import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetSickReports } from '../../hooks/dashboardhooks/useDasboardData';

interface SickReportData {
  id: number;
  officer: {
    armyNumber: string;
    name: string;
    rank: string;
    department: string;
  };
  recommending_officer: {
    armyNumber: string;
    name: string;
    rank: string;
  };
  excuse_duty: string;
  excuse_duty_days: number;
  admission: string;
  admission_days: number;
  sick_leave_days: number;
  remark: string;
  return_date: string;
}

const SickRecord = () => {
  const { setSelectedSickRecord, setShowSickModal } = useContext(AppContext);
  const { data: sickReports, refetch: refetchSickReports } = useGetSickReports();

  useEffect(() => {
    refetchSickReports();
  }, [refetchSickReports]);

  // Transform the backend data to match the table format
  const transformedData = useMemo(() => {
    if (!sickReports || !Array.isArray(sickReports)) return [];

    return sickReports.map((report: SickReportData, index: number) => ({
      id: report.id,
      number: index + 1,
      serviceNumber: report.officer.armyNumber,
      rank: report.officer.rank,
      name: report.officer.name,
      department: report.officer.department,
      admission: report.admission,
      sick_leave_days: report.sick_leave_days,
      excuse: report.excuse_duty,
      // Include additional data that might be needed when clicking on a row
      excuse_duty_days: report.excuse_duty_days,
      admission_days: report.admission_days,
      remark: report.remark,
      returnDate: report.return_date,
      recommending_officer: report.recommending_officer
    }));
  }, [sickReports]);

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'serviceNumber',
      header: 'Army Number',
      className: 'w-[10%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[10%]'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[20%]'
    },
    {
      key: 'department',
      header: 'Department',
      className: 'w-[10%]'
    },
    {
      key: 'admission',
      header: 'Admission',
      className: 'w-[5%]'
    },
    {
      key: 'sick_leave_days',
      header: 'Sick Leave (No. of Days)',
      className: 'w-[23%]'
    },
    {
      key: 'excuse',
      header: 'Excuse Duty',
      className: 'w-[23%]'
    }
  ];

  return (
    <MainTable
      data={transformedData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={10}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Sick Cell clicked:', params);
        setShowSickModal(true);
        // Pass the entire row data instead of just the name
        setSelectedSickRecord(params.row);
      }}
    />
  );
};

export default SickRecord;
