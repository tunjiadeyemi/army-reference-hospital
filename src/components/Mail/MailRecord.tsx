import { useContext, useEffect } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';

import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import { useGetMailArchives } from '../../hooks/dashboardhooks/useDasboardData';

const MailRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'id',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'subject',
      header: 'Subject',
      className: 'w-[10%]'
    },
    {
      key: 'to_from',
      header: 'To/From',
      className: 'w-[10%]'
    },
    {
      key: 'ref_no',
      header: 'File Ref No.',
      className: 'w-[10%]'
    },
    {
      key: 'date_sent',
      header: 'Date Sent/Received',
      className: 'w-[5%]'
    },
    {
      // key: 'attached_file',
      key: '',
      header: 'Trade Class',
      className: 'w-[13%]',
      render: (_value) => (
        <div>{_value && <img src="/department/paper-clip-icon.svg" alt="" className="w-6" />}</div>
      )
    }
  ];

  const { setSelectedMailRecord, setShowMailModal } = useContext(AppContext);
  const { data: mailRecords, refetch: refetchMailArchives } = useGetMailArchives();
    
   useEffect(() => {
        refetchMailArchives();
      }, [refetchMailArchives]);
  return (
    <MainTable
      data={mailRecords}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowMailModal(true);
        setSelectedMailRecord(params.row);
      }}
    />
  );
};

export default MailRecord;
