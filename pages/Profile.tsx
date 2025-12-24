
import React from 'react';

const Profile: React.FC = () => {
  const achievements = [
    { title: 'Early Bird', icon: 'fa-sun', color: 'text-orange-500', desc: 'Completed 5 lessons before 8 AM' },
    { title: 'Math Whiz', icon: 'fa-calculator', color: 'text-blue-500', desc: 'Scored 90%+ in 3 Math quizzes' },
    { title: '7-Day Streak', icon: 'fa-fire', color: 'text-red-500', desc: 'Kept the fire burning for a full week' },
    { title: 'Quiz Master', icon: 'fa-brain', color: 'text-purple-500', desc: 'Aced 10 curriculum practice tests' },
  ];

  const subjects = [
    { name: 'Mathematics', progress: 85, color: 'bg-indigo-600' },
    { name: 'Physical Sciences', progress: 42, color: 'bg-emerald-500' },
    { name: 'Accounting', progress: 68, color: 'bg-amber-500' },
    { name: 'English FAL', progress: 92, color: 'bg-rose-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 -z-10"></div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thando" className="w-40 h-40 rounded-full border-8 border-white shadow-2xl relative" alt="Profile" />
          <button className="absolute bottom-2 right-2 bg-slate-900 text-white w-10 h-10 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <i className="fa-solid fa-pencil text-xs"></i>
          </button>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-4xl font-black text-slate-900">Thando Zulu</h2>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 self-center">
              <i className="fa-solid fa-crown"></i> Premium
            </span>
          </div>
          <p className="text-slate-500 font-bold text-lg">Grade 11 Student • IEB South Africa</p>
          
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
             <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center min-w-[100px]">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total XP</p>
               <p className="text-xl font-black text-slate-900">4,820</p>
             </div>
             <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center min-w-[100px]">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</p>
               <p className="text-xl font-black text-slate-900">Top 5%</p>
             </div>
             <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 text-center min-w-[100px]">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Courses</p>
               <p className="text-xl font-black text-slate-900">12</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress & Goals */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <i className="fa-solid fa-chart-pie text-indigo-500"></i> Curriculum Progress
              </h3>
              <button className="text-indigo-600 font-bold text-sm hover:underline">Download Report</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subjects.map((subj, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-black text-slate-700">{subj.name}</span>
                    <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{subj.progress}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                    <div 
                      className={`h-full ${subj.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                      style={{ width: `${subj.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <i className="fa-solid fa-credit-card text-emerald-500"></i> Subscription & Billing
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
               <div className="flex-1 text-center md:text-left">
                  <p className="text-emerald-900 font-black text-xl mb-1">Premium Plus Plan</p>
                  <p className="text-emerald-700 text-sm font-medium">Billed monthly (R199/month). Your next billing date is Nov 12, 2024.</p>
               </div>
               <div className="flex gap-3">
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">Manage</button>
                  <button className="bg-white text-emerald-600 border border-emerald-200 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all">Invoice</button>
               </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm h-fit sticky top-8">
          <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <i className="fa-solid fa-award text-amber-500"></i> Achievement Hub
          </h3>
          <div className="space-y-6">
            {achievements.map((ach, idx) => (
              <div key={idx} className="flex gap-4 group cursor-help">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-indigo-200 transition-colors">
                  <i className={`fa-solid ${ach.icon} ${ach.color} text-2xl group-hover:scale-110 transition-transform`}></i>
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">{ach.title}</p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            See All 24 Badges
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
