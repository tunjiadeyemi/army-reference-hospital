import { useContext } from 'react';
import { sampleUnitBibleData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';

import { useState } from 'react';

const Bible: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>('Active');
  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'no',
      header: 'jj',
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[20%]',
      render: (_value, row) => (
        <div className="flex items-center space-x-2">
          <img src={row.image} alt="user image" />
          <span className="text-sm font-medium text-gray-900">{row.name}</span>
        </div>
      )
    },
    {
      key: 'serviceNumber',
      header: 'Service No.',
      className: 'w-[13%]'
    },
    {
      key: 'rank',
      header: 'Rank',
      className: 'w-[13%]'
    },
    {
      key: 'corps',
      header: 'Corps',
      className: 'w-[13%]'
    },
    {
      key: 'age',
      header: 'Age',
      className: 'w-[13%]'
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-[13%]',
      render: (_value, row) => (
        <span
          className={`text-sm ${row.status === 'Active' ? 'text-[#22A08E]' : 'text-[#FF2A2A]'}`}
        >
          {row.status}
        </span>
      )
    },
    {
      key: 'dateOfEnlistment',
      header: 'Date of Enlistment',
      className: 'w-[30%]'
    }
  ];

  const { setSelectedBiodata, setShowBiodataModal } = useContext(AppContext);

  return (
    <MainTable
      data={sampleUnitBibleData}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowBiodataModal(true);
        setSelectedBiodata(params.row.name);
      }}
      filterable={{
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'SOS (Inactive)', value: 'Inactive' }
        ],
        value: filterValue,
        onChange: setFilterValue,
        filterKey: 'status'
      }}
    />
  );
};

export default Bible;
