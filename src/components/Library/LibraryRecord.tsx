import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleLibraryData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const LibraryRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'bookTitle',
      header: 'Book Title',
      className: 'w-[10%]'
    },
    {
      key: 'author',
      header: 'Author',
      className: 'w-[10%]'
    },
    {
      key: 'genre',
      header: 'Genre',
      className: 'w-[20%]'
    },
    {
      key: 'noCopies',
      header: 'No. copies',
      className: 'w-[10%]'
    },
    {
      key: 'date',
      header: 'Dated uploaded',
      className: 'w-[10%]'
    }
  ];

  const { setSelectedLibraryRecord, setShowLibraryModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleLibraryData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowLibraryModal(true);
        setSelectedLibraryRecord(params.row.name);
      }}
    />
  );
};

export default LibraryRecord;
