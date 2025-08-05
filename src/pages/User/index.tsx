/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import Pagination from '../../components/User/Pagination';
import Table from '../../components/User/Table';
import Role from '../../components/User/Role';
import EditUser from '../../components/User/EditUser';
import AddUser from '../../components/User/AddUser';
import Layout from '../../components/Layout';
import { sampleUserData } from '../../utils/constants';
import { AppContext } from '../../context/AppContext';
// import { useAxiosInstance } from '../../hooks/axios';
// import axios from 'axios';

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [active, setActive] = useState('User');
  const [roles, setRoles] = useState<{ id?: number; role_name: string; permissions: string[] }[]>(
    []
  );
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { setShowAdminDetails, setAdminDetails } = useContext(AppContext);

  // const axiosInstance = useAxiosInstance();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = async () => {
    setLoading(false);
    // setLoading(true);
    // try {
    //   const response = await axios.get(`${baseUrl}/admin/users`, axiosInstance);
    //   setUsers(response.data.data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const fetchRoles = async () => {
    setLoading(false);
    // setLoading(true);
    // try {
    //   const response = await axios.get(`${baseUrl}/admin/roles`, axiosInstance);
    //   setRoles(response.data.data);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [active]);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Rank', accessor: 'rank' },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', accessor: 'status' },
    { header: 'Date Created', accessor: 'dateCreated' }
  ];

  // const paginatedData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const paginatedData = sampleUserData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleAddRole() {
    const newRole = {
      role_name: 'New Role',
      permissions: ['Define role features here']
    };
    setRoles([...roles, newRole]); // Append the new role to the roles list
  }

  const handleSaveRole = async (updatedRole: any, isEdit: any) => {
    console.log('Saving role:', updatedRole, isEdit);
    // if (isEdit !== true) {
    //   try {
    //     const response = await axios.put(
    //       `${baseUrl}/admin/roles/edit/${updatedRole.id}`,
    //       updatedRole,
    //       axiosInstance
    //     );

    //     if (response.status === 200) {
    //       const serverRole = {
    //         id: response.data.data.roleId,
    //         role_name: response.data.data.role_name,
    //         permissions: response.data.data.permissions
    //       };

    //       const updatedRoles = roles.map((role) => (role.id === serverRole.id ? serverRole : role));

    //       setRoles(updatedRoles);
    //     }
    //   } catch (error) {
    //     console.error('Error adding user:', error);
    //   }
    // } else {
    //   try {
    //     const response = await axios.post(
    //       `${baseUrl}/admin/roles/create`,
    //       updatedRole,
    //       axiosInstance
    //     );

    //     if (response.status === 201) {
    //       const serverRole = {
    //         id: response.data.data.roleId,
    //         role_name: response.data.data.role_name,
    //         permissions: response.data.data.permissions
    //       };

    //       const updatedRoles = roles.map((role) => {
    //         // If this role matches what we're trying to save and has no ID, replace it
    //         if (!role.id && role.role_name === 'New Role') {
    //           return serverRole;
    //         }
    //         return role;
    //       });

    //       setRoles(updatedRoles);
    //     }
    //   } catch (error) {
    //     console.error('Error adding user:', error);
    //   }
    // }
  };

  const handleDeleteRole = async (index: number) => {
    console.log('Deleting role with index:', index);
    // try {
    //   const response = await axios.delete(`${baseUrl}/admin/roles/delete/${index}`, axiosInstance);

    //   if (response.status === 200) {
    //     const updatedRoles = roles.filter((role) => role.id !== index);
    //     setRoles(updatedRoles);
    //   }
    // } catch (error) {
    //   console.error('Error deleting user:', error);
    // }
  };

  const handleDeleteUser = async (index: number) => {
    console.log('Deleting user with index:', index);
    // try {
    //   const response = await axios.delete(`${baseUrl}/admin/users/delete/${index}`, axiosInstance);

    //   if (response.status === 200) {
    //     const updatedUsers = users.filter((user: any) => user.id !== index);
    //     setUsers(updatedUsers);
    //   }
    // } catch (error) {
    //   console.error('Error deleting user:', error);
    // }
  };

  return (
    <Layout className="h-full">
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] border">
          <div className="flex flex-col items-center gap-3">
            <img src="/animated-logo.svg" alt="" className="w-[6rem]" />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <section className="bg-white rounded-md p-6 pb-2">
          <header className="text-3xl font-semibold">Users/Admin</header>

          <section className="text-sm flex flex-col w-full md:flex-row justify-between items-start gap-5 md:gap-0 md:items-center my-7">
            <div className="flex items-center gap-3 w-[70%]">
              <div className="relative w-[40%] flex items-center">
                <img src="/search-icon.svg" alt="" className="w-6 -mr-[10%]" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border w-full outline-primary-light border-[#D9D9D9] text-sm placeholder:text-sm py-4 pl-10 pr-4"
                />
              </div>
              <button type="submit" className="text-sm px-5 py-2 text-white">
                Search
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActive('add')}
              className="flex w-fit items-center gap-2 px-7 py-3 rounded-md cursor-pointer text-white bg-[#22A08E]"
            >
              Add New Admin
            </button>
          </section>

          <div className="flex items-center gap-5 my-7 w-fit">
            <button
              onClick={() => setActive('User')}
              type="button"
              className={`${
                active === 'User'
                  ? 'bg-[#22A08E] text-white'
                  : 'bg-white border border-[#22A08E] text-[#22A08E]'
              } w-[50%] py-3 px-10 text-sm rounded-md cursor-pointer hover:scale-95 transition-all duration-300`}
            >
              User
            </button>
            <button
              onClick={() => setActive('Role')}
              type="button"
              className={`${
                active === 'Role'
                  ? 'bg-[#22A08E] text-white'
                  : 'bg-white border border-[#22A08E] text-[#22A08E]'
              } w-[50%] py-3 px-10 text-sm rounded-md cursor-pointer hover:scale-95 transition-all duration-300`}
            >
              Role
            </button>
          </div>

          <section>
            {active === 'User' && (
              <>
                <section className="w-full my-5">
                  <Table
                    deletable={true}
                    editable={true}
                    onEdit={(row: any) => {
                      setEditedUser(row);
                      setActive('edit');
                    }}
                    onDelete={(row: any) => handleDeleteUser(row.id)}
                    columns={columns}
                    data={paginatedData}
                    showHeader={true}
                    isSchool={true}
                    tableName="admin"
                    onAdminNameClick={(row: any) => {
                      console.log('Admin name clicked:', row);
                      setAdminDetails(row);
                      setShowAdminDetails(true);
                    }}
                  />
                </section>

                {/* <Pagination totalItems={users.length} onPageChange={handlePageChange} /> */}
                <Pagination totalItems={sampleUserData.length} onPageChange={handlePageChange} />
              </>
            )}

            {active === 'Role' && (
              <div>
                <header className="py-3 px-3 bg-[#22A08E] mb-5">
                  <h1 className="text-xl text-white font-semibold">Role</h1>
                </header>

                {roles.map((role, index) => (
                  <Role
                    key={index}
                    data={role}
                    isEdit={role.role_name === 'New Role'}
                    onSave={(updatedRole: any, isEdit: any) => handleSaveRole(updatedRole, isEdit)}
                    onDelete={() => handleDeleteRole(role.id ?? 0)} // Pass delete callback
                  />
                ))}

                {/* add new role */}
                <button
                  onClick={() => handleAddRole()}
                  type="button"
                  className="w-5 hover:scale-110 duration-300 transition-all"
                >
                  <img src="/department/add-black-icon.svg" alt="" className="w-full h-full" />
                </button>
              </div>
            )}

            {active === 'add' && (
              <div>
                <AddUser roles={roles} setActive={setActive} />
              </div>
            )}

            {active === 'edit' && (
              <div>
                <EditUser roles={roles} setActive={setActive} data={editedUser} />
              </div>
            )}
          </section>
        </section>
      )}
    </Layout>
  );
};

export default User;
