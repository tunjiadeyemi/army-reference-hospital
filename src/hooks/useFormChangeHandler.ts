import { useState } from "react";
// import { useState } from 'react';
function useFormChangeHandler<T extends Record<string, any>>(
  initialState: T
): [T, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [formDetails, setFormDetails] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return [formDetails, handleChange];
}

export default useFormChangeHandler;
