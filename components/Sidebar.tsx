
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: 'fa-house', path: '/' },
    { name: 'Courses', icon: 'fa-book-open', path: '/marketplace' },
    { name: 'AI Tutor', icon: 'fa-robot', path: '/tutor' },
    { name: 'Practice Quizzes', icon: 'fa-vial', path: '/quizzes' },
    { name: 'Performance', icon: 'fa-chart-line', path: '/profile' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 gradient-bg flex flex-col text-white shadow-2xl z-20`}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <h1 className="text-2xl font-black tracking-tighter italic">
            EDU<span className="text-yellow-400">PULSE</span>
          </h1>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <i className={`fa-solid ${isOpen ? 'fa-chevron-left' : 'fa-bars'} text-lg`}></i>
        </button>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path ? 'bg-white/25 shadow-lg shadow-black/10' : 'hover:bg-white/10'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
            {isOpen && <span className="font-semibold text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/5">
        <Link to="/profile" className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'} group transition-all`}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thando" className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/20" alt="Avatar" />
          {isOpen && (
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">Thando Zulu</p>
              <p className="text-[10px] text-white/60 font-medium">PREMIUM MEMBER</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
