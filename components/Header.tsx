
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1.5 w-full max-w-md">
        <i className="fa-solid fa-magnifying-glass text-slate-400 mr-2"></i>
        <input 
          type="text" 
          placeholder="Search subjects, topics, or tutors..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-bell text-xl"></i>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-indigo-100 flex items-center gap-2">
          <i className="fa-solid fa-plus"></i>
          Upgrade to Premium
        </button>
      </div>
    </header>
  );
};

export default Header;
