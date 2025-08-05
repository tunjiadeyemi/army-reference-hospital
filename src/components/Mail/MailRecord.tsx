import { useContext } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleMailData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';

const MailRecord = () => {
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'sn',
      header: 'S/N',
      className: 'w-[10%]'
    },
    {
      key: 'subject',
      header: 'Subject',
      className: 'w-[10%]'
    },
    {
      key: 'toFrom',
      header: 'To/From',
      className: 'w-[20%]'
    },
    {
      key: 'ref',
      header: 'File Ref No.',
      className: 'w-[10%]'
    },
    {
      key: 'date',
      header: 'Date Sent/Received',
      className: 'w-[5%]'
    },
    {
      key: 'file',
      header: 'Trade Class',
      className: 'w-[23%]',
      render: (_value) => (
        <div>{_value && <img src="/department/paper-clip-icon.svg" alt="" className="w-6" />}</div>
      )
    }
  ];

  const { setSelectedMailRecord, setShowMailModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleMailData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowMailModal(true);
        setSelectedMailRecord(params.row.name);
      }}
    />
  );
};

export default MailRecord;
