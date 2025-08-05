import type React from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex w-full h-screen items-center overflow-hidden justify-center bg-black/40">
      {children}
    </div>
  );
};

export default Modal;
