import { useState } from 'react';
// import { useAxiosInstance } from '../../hooks/axios';
// import axios from 'axios';

interface Role {
  role_name: string;
  id?: number;
}
interface AddUserProps {
  roles: Role[];
  setActive: (active: string) => void;
}

const AddUser = ({ roles, setActive }: AddUserProps) => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const axiosInstance = useAxiosInstance();
  // const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleAddUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (password !== confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }
    // if (password.length < 6) {
    //   alert('Password must be at least 6 characters long');
    //   return;
    // }
    setLoading(true);
    setActive('User');
    // const data = {
    //   name: fullName,
    //   email,
    //   role_id: role,
    //   password,
    //   confirmPassword
    // };
    // try {
    //   await axios.post(`${baseUrl}/admin/users/create`, data, axiosInstance);
    // } catch (error) {
    //   console.error('Error adding user:', error);
    // } finally {
    //   setLoading(false);
    //   setActive('User');
    // }
  };

  return (
    <div>
      <header className="py-3 px-3 bg-[#22A08E]">
        <h1 className="text-xl text-white font-semibold">Add New User</h1>
      </header>

      <form className="w-[60%] mt-10 flex flex-col gap-5" onSubmit={handleAddUser}>
        <div className="w-full">
          <p className="font-semibold text-xs">Full Name</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
          />
        </div>

        <div className="w-full">
          <p className="font-semibold text-xs">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(Number(e.target.value))}
            className="py-3 px-1 mt-2 rounded-md w-full text-sm outline-primary-light border border-[#D9D9D9]"
          >
            <option value=""></option>
            {roles.map((role: Role, i: number) => (
              <option key={i} value={role.id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[48%]">
            <p className="font-semibold text-xs">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>

          <div className="w-[48%]">
            <p className="font-semibold text-xs">Confirm Password</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 mt-2 rounded-md w-full outline-primary-light border border-[#D9D9D9]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#22A08E] px-5 py-3 text-sm text-white w-fit rounded-md"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
