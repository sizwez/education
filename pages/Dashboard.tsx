
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', hours: 2.5, color: '#6366f1' },
  { name: 'Tue', hours: 4, color: '#6366f1' },
  { name: 'Wed', hours: 3, color: '#6366f1' },
  { name: 'Thu', hours: 5, color: '#a855f7' },
  { name: 'Fri', hours: 2, color: '#6366f1' },
  { name: 'Sat', hours: 1.5, color: '#6366f1' },
  { name: 'Sun', hours: 3.5, color: '#6366f1' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Molo, Thando! 🇿🇦</h2>
          <p className="text-slate-500 font-medium">Ready to tackle your next Grade 11 challenge? You're doing great!</p>
        </div>
        <div className="flex gap-3">
          <Link to="/tutor" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl">
            <i className="fa-solid fa-headset text-indigo-400"></i>
            Ask AI Tutor
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Weekly XP', value: '1,240', delta: '+12%', icon: 'fa-bolt', color: 'bg-indigo-500', trend: 'up' },
          { label: 'Study Streak', value: '7 Days', delta: 'Personal Best!', icon: 'fa-fire', color: 'bg-orange-500', trend: 'up' },
          { label: 'Global Rank', value: '#452', delta: 'Top 5%', icon: 'fa-earth-africa', color: 'bg-emerald-500', trend: 'up' },
          { label: 'Tutor Credits', value: '18', delta: 'Renew in 4d', icon: 'fa-coins', color: 'bg-amber-500', trend: 'neutral' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {stat.delta}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Charts */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-800">Study Intensity</h3>
              <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-slate-700">Hours</button>
                <button className="px-3 py-1 text-xs font-bold text-slate-400">XP</button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                  />
                  <Bar dataKey="hours" radius={[8, 8, 8, 8]} barSize={32}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recently Viewed */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">Continue Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Probability & Stats', progress: 85, color: 'bg-indigo-500', instructor: 'Dr. Mthembu' },
                { title: 'Chemical Equilibrium', progress: 24, color: 'bg-emerald-500', instructor: 'Prof. Naidoo' },
              ].map((course, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                      <p className="text-xs text-slate-400">{course.instructor}</p>
                    </div>
                    <i className="fa-solid fa-circle-play text-slate-200 group-hover:text-indigo-500 text-2xl transition-colors"></i>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${course.color} transition-all`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full -z-10"></div>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Upcoming Live Sessions</h3>
            <div className="space-y-4">
              {[
                { time: '14:30', title: 'NSC Physics Workshop', tutor: 'Prof. Naidoo', status: 'Live Soon' },
                { time: '16:00', title: 'Accounting Q&A', tutor: 'Mrs. Khumalo', status: 'In 2h' },
                { time: 'Mon 09:00', title: 'Weekly Recap', tutor: 'EduPulse Team', status: 'Scheduled' },
              ].map((cls, idx) => (
                <div key={idx} className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:border-indigo-200 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{cls.time.split(' ')[0]}</span>
                    <span className="text-sm font-black text-slate-800">{cls.time.split(' ')[1] || cls.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{cls.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      {cls.status === 'Live Soon' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>}
                      {cls.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
              Go to Calendar
            </button>
          </div>

          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <i className="fa-solid fa-crown text-white/20 text-4xl"></i>
            </div>
            <h4 className="text-lg font-bold mb-2">Pro Tutors On-Demand</h4>
            <p className="text-sm text-indigo-100 mb-6">Unlock 1-on-1 private sessions with certified educators starting from R150/hr.</p>
            <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Find a Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
