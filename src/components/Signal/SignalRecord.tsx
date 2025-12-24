import { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';

import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetSignalForms, useDeleteSignalForm } from '../../hooks/dashboardhooks/useDasboardData';

const SignalRecord = () => {
  // Fetch signal forms data
  const { data: signalForms = [], isLoading, error } = useGetSignalForms();
  const deleteSignalFormMutation = useDeleteSignalForm();

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'drafter_name_in',
      header: 'Drafter Name',
      className: 'w-[15%]'
    },
    {
      key: 'from',
      header: 'From',
      className: 'w-[15%]'
    },
    {
      key: 'to',
      header: 'To',
      className: 'w-[15%]'
    },
    {
      key: 'security_classification',
      header: 'Classification',
      className: 'w-[10%]'
    },
    {
      key: 'date_time_group_month',
      header: 'Date/Time',
      className: 'w-[15%]'
    },
    {
      key: 'system',
      header: 'System',
      className: 'w-[10%]'
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[5%]',
      render: (_: any, row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.id);
          }}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete signal form"
        >
          <TbTrash size={20} />
        </button>
      )
    }
  ];

  const { setSelectedSignalRecord, setShowSignalModal } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this signal form?')) {
      try {
        console.log('[SignalRecord] Deleting signal form with ID:', id);
        await deleteSignalFormMutation.mutateAsync(id);
        console.log('[SignalRecord] Signal form deleted successfully');
      } catch (error) {
        console.error('[SignalRecord] Delete failed:', error);
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Error Loading Signal Forms</h3>
          <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      </div>
    );
  }

  // Transform API data for table display
  const tableData = signalForms.map((form: any, index: number) => ({
    ...form,
    number: index + 1
  }));



  return (
    <MainTable
      data={tableData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Signal form selected:', params);
        const signalFormId = params.row.id;
        setShowSignalModal(true);
        setSelectedSignalRecord(signalFormId);
      }}
    />
  );
};

export default SignalRecord;
