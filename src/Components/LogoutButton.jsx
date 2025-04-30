import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-end w-full pr-6 mb-6">
      <button
        className="bg-red-600 text-white py-2 px-6 rounded-full font-bold hover:bg-red-700 transition-all"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
