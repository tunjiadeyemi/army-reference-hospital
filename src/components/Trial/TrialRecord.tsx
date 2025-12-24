import { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetTrialForms, useDeleteTrialForm } from '../../hooks/dashboardhooks/useDasboardData';

const TrialRecord = () => {
  // Fetch trial forms data
  const { data: trialForms = [], isLoading, error } = useGetTrialForms();
  const deleteTrialFormMutation = useDeleteTrialForm();

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'number',
      header: 'S/N',
      className: 'w-[5%]'
    },
    {
      key: 'name',
      header: 'Officer Name',
      className: 'w-[15%]'
    },
    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[15%]'
    },
    {
      key: 'finding',
      header: 'Finding',
      className: 'w-[20%]'
    },
    {
      key: 'award',
      header: 'Award',
      className: 'w-[20%]'
    },
    {
      key: 'date',
      header: 'Date',
      className: 'w-[15%]'
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[5%]',
      render: (_value: any, row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.id);
          }}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete trial form"
        >
          <TbTrash size={20} />
        </button>
      )
    }
  ];

  const { setSelectedTrialRecord, setShowTrialModal } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this trial form?')) {
      try {
        console.log('[TrialRecord] Deleting trial form with ID:', id);
        await deleteTrialFormMutation.mutateAsync(id);
        console.log('[TrialRecord] Trial form deleted successfully');
      } catch (error) {
        console.error('[TrialRecord] Delete failed:', error);
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
          <h3 className="text-lg font-semibold mb-2">Error Loading Trial Forms</h3>
          <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      </div>
    );
  }

  // Transform API data for table display
  const tableData = trialForms.map((form: any, index: number) => ({
    ...form,
    number: index + 1
  }));

  // Show empty state

  return (
    <MainTable
      data={tableData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Trial form selected:', params);
        const trialFormId = params.row.id;
        setShowTrialModal(true);
        setSelectedTrialRecord(trialFormId);
      }}
    />
  );
};

export default TrialRecord;
