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

const Home = () => {
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
    { name: 'Courtney Henry', rank: 'General', expiredDate: '2 days' },
    { name: 'Arlene McCoy', rank: 'Private', expiredDate: '6 days ago' },
    { name: 'Floyd Miles', rank: 'Major', expiredDate: '4 days ago' },
    { name: 'Albert Flores', rank: 'Captain', expiredDate: '1 day ago' },
    { name: 'Esther Howard', rank: 'Corporal', expiredDate: '2 days' },
    { name: 'Robert Fox', rank: 'Major', expiredDate: '12 days' },
    { name: 'Darrell Steward', rank: 'Major', expiredDate: '22 days' },
    { name: 'Jacob Jones', rank: 'Major', expiredDate: '33 days' }
  ];

  const signalMembers: SignalMember[] = [
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' },
    { name: 'Courtney Henry', rank: 'General', maritalStatus: 'Single', armyNumber: 'NA34567' }
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
    { header: 'Expired Date', accessKey: 'expiredDate' }
  ];

  const signalMemberColumns: TableColumn<SignalMember>[] = [
    { header: 'Name', accessKey: 'name' },
    { header: 'Rank', accessKey: 'rank' },
    { header: 'Marital status', accessKey: 'maritalStatus' },
    { header: 'Army Number', accessKey: 'armyNumber' }
  ];

  return (
    <Layout className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Overdue Leave"
          value="900"
          subtitle="30 days"
          icon={<img src="/home/overdue-icon.svg" alt="overdue-icon" />}
        />
        <StatsCard
          title="Released officers"
          value="100"
          subtitle="30 days"
          icon={<img src="/home/release-icon.svg" alt="release-icon" />}
        />
        <StatsCard
          title="Total Shops"
          value="900"
          subtitle=""
          icon={<img src="/home/total-shops.svg" alt="total-shops" />}
        />
        <StatsCard
          title="Total approved Leave/Pas"
          value="100"
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
            <Table data={recentOfficers} columns={officerColumns} />
          </div>

          {/* Recently Returned Accommodation */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="text-base font-semibold text-gray-900 px-3 py-4">
              Recently Returned accommodation
            </h3>
            <Table data={accommodations} columns={accommodationColumns} />
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
            <Table data={expiredSickLeave} columns={sickLeaveColumns} />
          </div>

          {/* Recent Added Members */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Added Member to the Signal list
              </h3>
            </div>
            <Table data={signalMembers} columns={signalMemberColumns} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
