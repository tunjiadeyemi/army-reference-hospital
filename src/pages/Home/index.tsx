import type {
  Accommodation,
  Officer,
  SickLeave,
  SignalMember,
  TableColumn
} from '../../utils/types';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import Calendar from '../../components/Calendar';
import Layout from '../../components/Layout';

import { useOverviewData } from '../../hooks/dashboardhooks/useDasboardData';

const Home = () => {

   const { data: overviewData } = useOverviewData();
  //  console.log("OverviewData:", overviewData)
  const recentOfficers: Officer[] = [
    { name: 'Courtney Henry', rank: 'General', date: '5/19/2025' },
    { name: 'Arlene McCoy', rank: 'Private', date: '5/19/2025' },
    { name: 'Floyd Miles', rank: 'Major', date: '5/19/2025' },
    { name: 'Albert Flores', rank: 'Captain', date: '5/19/2025' },
    { name: 'Esther Howard', rank: 'Corporal', date: '5/19/2025' },
    { name: 'Robert Fox', rank: 'Major', date: '5/19/2025' },
    { name: 'Darrell Steward', rank: 'Major', date: '5/19/2025' },
    { name: 'Jacob Jones', rank: 'Major', date: '5/19/2025' }
  ];

  const accommodations: Accommodation[] = [
    { blockNo: 'Block 5', roomNo: '12' },
    { blockNo: 'Block 56', roomNo: '56' },
    { blockNo: 'Block 4', roomNo: '89' },
    { blockNo: 'Block 2', roomNo: '90' },
    { blockNo: 'Block 8', roomNo: '40' },
    { blockNo: 'Block 7', roomNo: '17' },
    { blockNo: 'Block 10', roomNo: '99' },
    { blockNo: 'Block 10', roomNo: '44' }
  ];

  const expiredSickLeave: SickLeave[] = [
    { name: 'Courtney Henry', rank: 'General', date_expired: '2 days' },
    { name: 'Arlene McCoy', rank: 'Private', date_expired: '6 days ago' },
    { name: 'Floyd Miles', rank: 'Major', date_expired: '4 days ago' },
    { name: 'Albert Flores', rank: 'Captain', date_expired: '1 day ago' },
    { name: 'Esther Howard', rank: 'Corporal', date_expired: '2 days' },
    { name: 'Robert Fox', rank: 'Major', date_expired: '12 days' },
    { name: 'Darrell Steward', rank: 'Major', date_expired: '22 days' },
    { name: 'Jacob Jones', rank: 'Major', date_expired: '33 days' }
  ];

  const signalMembers: SignalMember[] = [
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', marital_status: 'Single', army_number: 'NA34567' }
  ];

  const officerColumns: TableColumn<Officer>[] = [
    { header: 'Name', accessKey: 'name' },
    { header: 'Rank', accessKey: 'rank' },
    { header: 'Date', accessKey: 'date' }
  ];

  const accommodationColumns: TableColumn<Accommodation>[] = [
    { header: 'Block No', accessKey: 'blockNo' },
    { header: 'Room No.', accessKey: 'roomNo' }
  ];

  const sickLeaveColumns: TableColumn<SickLeave>[] = [
    { header: 'Name', accessKey: 'name' },
    { header: 'Rank', accessKey: 'rank' },
    { header: 'Expired Date', accessKey: 'date_expired' }
  ];

  const signalMemberColumns: TableColumn<SignalMember>[] = [
    { header: 'Name', accessKey: 'name' },
    { header: 'Rank', accessKey: 'rank' },
    { header: 'Marital status', accessKey: 'marital_status' },
    { header: 'Army Number', accessKey: 'army_number' }
  ];

  return (
    <Layout className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Overdue Leave"
          value={overviewData?.overdueLeave ?? "N/A"}
          subtitle="30 days"
          icon={<img src="/home/overdue-icon.svg" alt="overdue-icon" />}
        />
        <StatsCard
          title="Released Officers"
          value={overviewData?.releasedOfficers ?? "N/A"}
          subtitle="30 days"
          icon={<img src="/home/release-icon.svg" alt="release-icon" />}
        />
        <StatsCard
          title="Total Shops"
          value={overviewData?.totalShops ?? "N/A"}
          subtitle=""
          icon={<img src="/home/total-shops.svg" alt="total-shops" />}
        />
        <StatsCard
          title="Total approved Leave/Pass"
          value={overviewData?.approvedLeave ?? "N/A"}
          subtitle=""
          icon={<img src="/home/total-leaves.svg" alt="total-leaves" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col gap-5">
        {/* Left Column - Tables */}
        <div className="grid lg:grid-cols-3 items-start gap-5">
          {/* Recently Released Officers */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="text-base font-semibold text-gray-900 px-3 py-4">
              Recently Released Officer from the guard dom
            </h3>
            <Table data={overviewData?.recently_released_officers ?? recentOfficers} columns={officerColumns} />
          </div>

          {/* Recently Returned Accommodation */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="text-base font-semibold text-gray-900 px-3 py-4">
              Recently Returned accommodation
            </h3>
            <Table data={overviewData?.recently_returned_accomodation ?? accommodations} columns={accommodationColumns} />
          </div>

          <div className="h-full">
            <Calendar />
          </div>
        </div>

        {/* Bottom Row Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Expired Sick Leave */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Expired Sick leave</h3>
            </div>
            <Table data={overviewData?.expired_sick_leave ?? expiredSickLeave} columns={sickLeaveColumns} />
          </div>

          {/* Recent Added Members */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Added Member to the Signal list
              </h3>
            </div>
            <Table data={overviewData?.recently_added_to_signal_list ?? signalMembers} columns={signalMemberColumns} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
