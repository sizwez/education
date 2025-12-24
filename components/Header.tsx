
import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
      <div className="flex items-center bg-slate-100 rounded-xl px-4 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all">
        <i className="fa-solid fa-magnifying-glass text-slate-400 mr-3"></i>
        <input 
          type="text" 
          placeholder="Search subjects, topics, or tutors..." 
          className="bg-transparent border-none outline-none text-sm w-full font-medium"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fa-solid fa-bell text-xl"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
          <i className="fa-solid fa-crown text-yellow-300"></i>
          Go Premium
        </button>
      </div>
    </header>
  );
};

export default Header;
