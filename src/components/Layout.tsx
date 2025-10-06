import { useArmsData, useDeptFilesData, useOfficersData, useOverviewData } from "../hooks/dashboardhooks/useDasboardData";


const Layout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useOverviewData();
  const { data: deptFiles, isLoading: deptLoading, refetch: refetchDeptFiles } = useDeptFilesData();
  const {data: officers, isLoading: officersLoading, refetch: refetchOfficers } = useOfficersData()
  const {data: armsData, isLoading: armsLoading, refetch: refetchArms} = useArmsData()

 
  return (
    <div
      className={`bg-[#F2F3F6] p-6 w-full h-screen overflow-hidden overflow-y-scroll ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
