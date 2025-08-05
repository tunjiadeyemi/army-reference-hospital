/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const Role = ({ data, onSave, onDelete, isEdit }: any) => {
  const [isEditing, setIsEditing] = useState(isEdit); // State to toggle edit mode
  const [roleName, setRoleName] = useState(data.role_name); // State to hold role name
  const [permissions, setPermissions] = useState([...data.permissions]); // State for permissions array

  const handleFeatureChange = (index: number, value: string) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index] = value;
    setPermissions(updatedPermissions);
  };

  const handleAddFeature = () => {
    setPermissions([...permissions, '']); // Add an empty string to create a new input field
  };

  const handleSave = () => {
    onSave({ id: data?.id, role_name: roleName, permissions }, isEdit); // Pass updated role data to parent
    setIsEditing(false); // Exit edit mode
  };

  const handleDelete = (index: number) => {
    if (window.confirm(`Are you sure you want to delete the role "${index}"?`)) {
      onDelete(index); // Trigger delete callback
    }
  };

  return (
    <div className="flex items-start justify-between text-sm py-7">
      {isEditing ? (
        // Editing mode
        <>
          <div className="w-[30%]">
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </div>
          <div className="flex flex-col items-start w-[60%] gap-2">
            {permissions?.map((item: string, i: number) => (
              <div key={i} className="w-full flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </div>
            ))}
            <button
              onClick={handleAddFeature}
              type="button"
              className="w-5 mt-2 hover:scale-110 duration-300 transition-all"
            >
              <img src="/department/add-black-icon.svg" alt="" className="w-full h-full" />
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <button
              type="button"
              onClick={handleSave}
              className="text-green-600 hover:scale-110 duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-red-600 hover:scale-110 duration-300"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        // View mode
        <>
          <p className="w-[30%] text-black">{data.role_name}</p>
          <div className="flex flex-col items-start w-[60%] gap-2">
            {data?.permissions?.map((item: string, i: number) => (
              <p className="font-light" key={i}>
                {item}
              </p>
            ))}
          </div>
          <div className="flex gap-5 items-center">
            <button
              type="button"
              onClick={() => setIsEditing(true)} // Enable edit mode
              className="w-5 hover:scale-110 duration-300 transition-all"
            >
              <img src="/edit-icon.svg" alt="Edit" className="w-full h-full" />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(data.id)} // Trigger delete action
              className="w-5 hover:scale-110 duration-300 transition-all"
            >
              <img src="/delete-icon.svg" alt="Delete" className="w-full h-full" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Role;
