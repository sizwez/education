
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { EnrolledCourse, QuizResult } from '../types';

const data = [
  { name: 'Mon', hours: 2.5, color: '#6366f1' },
  { name: 'Tue', hours: 4, color: '#6366f1' },
  { name: 'Wed', hours: 3, color: '#6366f1' },
  { name: 'Thu', hours: 5, color: '#a855f7' },
  { name: 'Fri', hours: 2, color: '#6366f1' },
  { name: 'Sat', hours: 1.5, color: '#6366f1' },
  { name: 'Sun', hours: 3.5, color: '#6366f1' },
];

interface DashboardProps {
  enrolledCourses: EnrolledCourse[];
  quizHistory: QuizResult[];
}

const Dashboard: React.FC<DashboardProps> = ({ enrolledCourses, quizHistory }) => {
  const avgScore = quizHistory.length > 0 
    ? Math.round(quizHistory.reduce((acc, q) => acc + (q.score / q.total), 0) / quizHistory.length * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Molo, Thando! 🇿🇦</h2>
          <p className="text-slate-500 font-medium">Ready to tackle your next Grade 11 challenge? You're doing great!</p>
        </div>
        <div className="flex gap-3">
          <Link to="/tutor" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            <i className="fa-solid fa-robot"></i>
            Ask AI Tutor
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Weekly XP', value: (quizHistory.length * 100).toLocaleString(), delta: '+12%', icon: 'fa-bolt', color: 'bg-indigo-500', trend: 'up' },
          { label: 'Study Streak', value: '7 Days', delta: 'Keep it up!', icon: 'fa-fire', color: 'bg-orange-500', trend: 'up' },
          { label: 'Avg Quiz Score', value: `${avgScore}%`, delta: quizHistory.length > 0 ? 'Top Tier' : 'N/A', icon: 'fa-graduation-cap', color: 'bg-emerald-500', trend: 'up' },
          { label: 'Enrolled', value: enrolledCourses.length.toString(), delta: 'Courses', icon: 'fa-book', color: 'bg-amber-500', trend: 'neutral' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-[2.5rem] -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-50`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {stat.delta}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800">Learning Activity</h3>
              <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold text-slate-800">Hours</button>
                <button className="px-4 py-1.5 text-xs font-bold text-slate-400">XP</button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '16px'}} 
                  />
                  <Bar dataKey="hours" radius={[12, 12, 12, 12]} barSize={28}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xl font-black text-slate-800">Continue Learning</h3>
              <Link to="/marketplace" className="text-indigo-600 text-xs font-bold hover:underline">Browse More</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.slice(0, 4).map((course, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{course.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{course.instructor}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-500">{course.progress}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
                  <p className="text-slate-500 font-bold mb-4">You haven't enrolled in any courses yet.</p>
                  <Link to="/marketplace" className="bg-white px-6 py-3 rounded-2xl text-indigo-600 font-black shadow-sm hover:shadow-md transition-all inline-block">
                    Explore Marketplace
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50/50 rounded-full -z-10"></div>
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-calendar-day text-indigo-500"></i>
              Live This Week
            </h3>
            <div className="space-y-6">
              {[
                { time: '14:30 Today', title: 'NSC Physics Workshop', tutor: 'Prof. Naidoo', active: true },
                { time: '16:00 Wed', title: 'Accounting Q&A', tutor: 'Mrs. Khumalo', active: false },
                { time: '09:00 Fri', title: 'IEB English Recap', tutor: 'Ms. Van Wyk', active: false },
              ].map((cls, idx) => (
                <div key={idx} className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-indigo-300 transition-colors">
                    <i className={`fa-solid fa-video ${cls.active ? 'text-red-500 animate-pulse' : 'text-slate-300'}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{cls.time}</p>
                    <h4 className="text-sm font-bold text-slate-800 truncate leading-tight">{cls.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{cls.tutor}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-100">
              Join Session Room
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform">
              <i className="fa-solid fa-bolt text-5xl"></i>
            </div>
            <h4 className="text-xl font-black mb-3">Skill Booster!</h4>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">Upgrade to unlock 1-on-1 private video tutoring sessions with NSC certified educators.</p>
            <button className="w-full bg-white text-indigo-600 py-3.5 rounded-2xl font-black hover:bg-indigo-50 transition-colors shadow-lg active:scale-95">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
