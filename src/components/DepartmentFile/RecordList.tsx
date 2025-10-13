import { useContext } from 'react';
// import { sampleDepartmentData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';
import { useDeptFilesData } from '../../hooks/dashboardhooks/useDasboardData';

const RecordList: React.FC = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-16'
    },
    {
      key: 'file_number',
      header: 'FILE NUMBER',
      className: 'w-1/3'
    },
    {
      key: 'file_title',
      header: 'FILE TITLE',
      className: 'w-1/2'
    },
    {
      key: 'uploads[0]',
      header: 'ATTACHMENT',
      className: 'w-24 text-center',
      render: () => (
        <div className="flex justify-center">
          <img src="/department/paper-clip-icon.svg" className="w-5 h-5" alt="Attachment" />
        </div>
      )
    }
  ];

  const { setShowAddRecordModal, setSelectedDepartmentRecord } = useContext(AppContext);
  const { data: filesList } = useDeptFilesData();
  return (
    <div className="p-6">
      <MainTable
        data={filesList}
        columns={columns}
        itemsPerPageOptions={[10, 25, 50, 100]}
        defaultItemsPerPage={11}
        showExportButtons={true}
        searchable={true}
        onCellClick={(params) => {
          console.log('Cell clicked:', params);
          setShowAddRecordModal(true);
          setSelectedDepartmentRecord(params.row);
        }}
      />
    </div>
  );
};

export default RecordList;
