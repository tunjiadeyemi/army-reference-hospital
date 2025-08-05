// import axios from 'axios';
import { useState } from 'react';
// import { useAxiosInstance } from '../../hooks/axios';

interface Role {
  role_name: string;
  id?: number;
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  status?: boolean;
  created_by?: string;
}

interface AddUserProps {
  roles: Role[];
  setActive: (active: string) => void;
  data: User;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditUser = ({ roles, setActive, data }: AddUserProps) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(0);

  // const axiosInstance = useAxiosInstance();
  // const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    // const formData = {
    //   name: data.name,
    //   email: data.email,
    //   role_id: role,
    //   status: true
    // };

    // try {
    //   const response = await axios.put(
    //     `${baseUrl}/admin/users/edit/${data.id}`,
    //     formData,
    //     axiosInstance
    //   );

    //   if (response.status === 200) {
    //     setActive('User');
    //   }
    // } catch (error) {
    //   console.error('Error adding user:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <header className="py-3 px-3 bg-[#22A08E]">
        <h1 className="text-xl text-white font-semibold">Add New User</h1>
      </header>

      <form className="w-[60%] mt-10 flex flex-col gap-5" onSubmit={handleEditUser}>
        <div className="w-full">
          <p className="font-semibold text-xs">Full Name</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-[#22A08E] border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-[#22A08E] border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
            className="py-3 px-1 mt-2 rounded-md w-full text-sm outline-[#22A08E] border border-[#D9D9D9]"
          >
            <option value=""></option>
            {roles.map((role: Role, i: number) => (
              <option key={i} value={role.id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#22A08E] px-5 py-3 text-sm text-white w-fit rounded-md"
          disabled={loading}
        >
          {loading ? 'Editing...' : 'Edit User'}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
