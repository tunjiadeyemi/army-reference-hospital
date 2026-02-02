import { useContext, useState, useEffect } from 'react';

import MainTable from '../MainTable';

import { AppContext } from '../../context/AppContext';
import { sampleOrderTwoData } from '../../utils/constants';
import type { MainTableColumn, MainTableData } from '../../utils/types/department';
import api from '../../services/api';

const OrderRecordTwo = () => {
  const [data, setData] = useState<MainTableData[]>([]);
  const [rawApiData, setRawApiData] = useState<Record<string, unknown>[]>([]);

  const columns: MainTableColumn<MainTableData>[] = [
    {
      key: 'no',
      header: 'S/N',
      className: 'w-[13%]'
    },
    {
      key: 'officer',
      header: 'Part 11 Order(Officer)',
      className: 'w-[20%]'
    },
    {
      key: 'issueNo',
      header: 'Issue No.',
      className: 'w-[13%]'
    },
    {
      key: 'date',
      header: 'Date',
      className: 'w-[13%]'
    },
    {
      key: 'unit',
      header: 'Unit',
      className: 'w-[13%]'
    },
    {
      key: 'sheetNumber',
      header: 'Sheet No.',
      className: 'w-[13%]'
    }
  ];

  const { setSelectedRecordTwo, setShowRecordModalTwo } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: apiData } = await api.get('/v1/part2-order');
        if (apiData && Array.isArray(apiData)) {
          // Store raw API data for passing full record on click
          setRawApiData(apiData);
          const mappedData = apiData.map((item: Record<string, unknown>, index: number) => ({
            id: index + 1,
            fileNumber: (item.issueNo as string) || '',
            fileTitle: (item.order_officer as string) || '',
            no: index + 1,
            officer: (item.order_officer as string) || '',
            issueNo: (item.issueNo as string) || '',
            date: (item.date as string) || '',
            unit: (item.unit as string) || '',
            sheetNumber: (item.sheetNo as string) || ''
          }));
          setData(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch part2-order data:', error);
        // Fallback to sample data if API fails
        setData(sampleOrderTwoData);
      } finally {
        // No loading state to set
      }
    };

    fetchData();
  }, []);

  return (
    <MainTable
      data={data}
      columns={columns}
      itemsPerPageOptions={[10, 25, 50, 100]}
      defaultItemsPerPage={11}
      showExportButtons={true}
      searchable={true}
      onCellClick={(params) => {
        console.log('Cell clicked:', params);
        // Find the full record from raw API data using the row's id (1-indexed)
        const fullRecord = rawApiData[params.row.no - 1] || params.row;
        setShowRecordModalTwo(true);
        setSelectedRecordTwo(fullRecord);
      }}
    />
  );
};

export default OrderRecordTwo;
