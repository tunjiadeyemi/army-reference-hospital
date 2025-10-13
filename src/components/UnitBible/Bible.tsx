import { useContext, useEffect, useState } from 'react';
import type { MainTableColumn } from '../../utils/types/department';
import MainTable from '../MainTable';
import { AppContext } from '../../context/AppContext';
import { useOfficersData } from '../../hooks/dashboardhooks/useDasboardData';

const Bible: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>('');
  const { setSelectedBiodata, setShowBiodataModal } = useContext(AppContext);
  const { setSelectedBiodataObj} = useContext(AppContext);

  const { data: officers, isLoading: officersLoading, refetch: refetchOfficers } = useOfficersData();

  // Refetch on mount - MUST be at the top, before any early returns
  useEffect(() => {
    refetchOfficers();
  }, [refetchOfficers]);

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const columns: MainTableColumn<any>[] = [
    {
      key: 'id',
      header: '#',
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Name',
      className: 'w-[20%]',
      render: (_value, row) => (
        <div className="flex items-center space-x-2">
          <img 
            src={row.photo || '/unitBible/images/default-avatar.svg'} 
            alt="officer" 
            className="w-8 h-8 rounded-full object-cover"
          />
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
      key: 'dateOfBirth',
      header: 'Age',
      className: 'w-[13%]',
      render: (_value, row) => calculateAge(row.dateOfBirth)
    },
    {
      key: 'dateOfPostedIn',
      header: 'Status',
      className: 'w-[13%]',
      render: (_value, row) => {
        const isActive = row.dateOfPostedIn ? 'Active' : 'Inactive';
        return (
          <span className={`text-sm ${isActive === 'Active' ? 'text-[#22A08E]' : 'text-[#FF2A2A]'}`}>
            {isActive}
          </span>
        );
      }
    },
    {
      key: 'dateOfCommission',
      header: 'Date of Commission',
      className: 'w-[30%]',
      render: (value) => {
        if (!value) return '-';
        const date = new Date(value);
        return date.toLocaleDateString('en-GB');
      }
    }
  ];

  // console.log("My officers:", officers);
  // console.log("Is Array?", Array.isArray(officers));
  // console.log("Length:", officers?.length);
  // console.log("Loading:", officersLoading);

  // Show loading state
  if (officersLoading) {
    return <div className="p-4">Loading officers...</div>;
  }

  // Handle empty or undefined data
  if (!officers || officers.length === 0) {
    return <div className="p-4">No officers found.</div>;
  }

  return (
    <MainTable
      data={officers}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={10}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        setShowBiodataModal(true);
        setSelectedBiodata(params.row.name);
        setSelectedBiodataObj(params.row)
      }}
      filterable={{
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' }
        ],
        value: filterValue,
        onChange: setFilterValue,
        filterKey: 'dateOfPostedIn'
      }}
    />
  );
};

export default Bible;