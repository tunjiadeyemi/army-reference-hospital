import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
// import { sampleLibraryData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetBooks } from '../../hooks/dashboardhooks/useDasboardData';

const LibraryRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'title',
      header: 'Book Title',
      className: 'w-[10%]'
    },
    {
      key: 'author',
      header: 'Author',
      className: 'w-[10%]'
    },
    {
      key: 'cateogory',
      header: 'Genre',
      className: 'w-[20%]'
    },
    {
      key: 'copies',
      header: 'No. copies',
      className: 'w-[10%]'
    },
    {
      key: 'language',
      header: 'Language',
      className: 'w-[10%]'
    }
  ];

  const { setSelectedLibraryRecord, setShowLibraryModal } = useContext(AppContext);
  
  const { data: Books } = useGetBooks();
    
  return (
    <MainTable
      data={Books}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowLibraryModal(true);
        setSelectedLibraryRecord(params.row);
      }}
    />
  );
};

export default LibraryRecord;
