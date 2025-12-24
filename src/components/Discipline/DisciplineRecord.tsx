import { useContext, useMemo } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import {
  useGetChargeSheets,
  useDeleteChargeSheet
} from '../../hooks/dashboardhooks/useDasboardData';
import { showSuccess, showError } from '../../utils/toast';

const DisciplineRecord = () => {
  const { data: chargeSheets = [] } = useGetChargeSheets();
  const deleteMutation = useDeleteChargeSheet();

  const handleDelete = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this charge sheet?')) {
      try {
        await deleteMutation.mutateAsync(id);
        showSuccess('Charge sheet deleted successfully');
      } catch (error) {
        showError('Failed to delete charge sheet');
      }
    }
  };

  const tableData = useMemo(() => {
    if (chargeSheets.length > 0) {
      return chargeSheets.map((sheet: any, index: number) => ({
        number: index + 1,
        offenseNumber: sheet.accused_officer_number || '-',
        rank: sheet.accused_officer_rank || '-',
        name: sheet.accused_officer_name || '-',
        unit: sheet.accused_officer_unit || '-',
        actions: (
          <button
            onClick={(e) => handleDelete(sheet.id, e)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete charge sheet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        ),
        id: sheet.id,
        ...sheet
      }));
    }
    return [];
  }, [chargeSheets, handleDelete]);

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'offenseNumber',
      header: 'Offense Number',
      className: 'w-[15%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[12%]'
    },
    {
      key: 'name',
      header: 'Officer Name',
      className: 'w-[20%]'
    },
    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[15%]'
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[8%]'
    }
  ];

  const { setSelectedDisciplineRecord, setShowDisciplineModal } = useContext(AppContext);

  return (
    <MainTable
      data={tableData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowDisciplineModal(true);
        setSelectedDisciplineRecord(params.row.id);
      }}
    />
  );
};

export default DisciplineRecord;
