/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminDetails = () => {
  const { adminDetails, setShowAdminDetails } = useContext(AppContext);

  const detailFields = [
    { label: 'Name', key: 'name' },
    { label: 'Email Address', key: 'email' },
    { label: 'Rank', key: 'rank' },
    { label: 'Role', key: 'role' },
    { label: 'Status', key: 'status' },
    { label: 'Date Created', key: 'dateCreated' }
  ];

  if (!adminDetails) {
    return null; // or a loading spinner, or a fallback UI
  }

  return (
    <div className="bg-black/20 fixed top-0 left-0 w-full h-[100vh] z-[1000] flex items-end justify-end">
      <div className="bg-white w-[30%] h-full">
        {/* Header */}
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold">{adminDetails.name}</h1>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowAdminDetails(false)}
          >
            <img src="/department/x-close-icon.svg" alt="Close" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-7 items-center h-[90vh] text-sm overflow-hidden overflow-y-auto p-5">
          <h1 className="font-semibold h-32 w-32 rounded-full text-3xl flex items-center justify-center bg-[#22A08E] text-white">
            {adminDetails.name[0]}
          </h1>
          <h1 className="text-black mb-3 text-xl">{adminDetails.name}</h1>

          {/* Details List */}
          {detailFields.map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between w-full">
              <p>{label}:</p>
              <p className="font-light text-left w-[60%]">{(adminDetails as any)[key]}</p>
            </div>
          ))}

          <div className="flex items-start justify-start w-full">
            <button
              type="button"
              className="px-7 cursor-pointer py-4 bg-[#FF2A2A] text-white text-sm rounded-md hover:bg-[#FF0000] transition-colors w-fit"
            >
              Remove Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
