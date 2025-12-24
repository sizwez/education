
import React from 'react';
import { EnrolledCourse, QuizResult } from '../types';

interface ProfileProps {
  enrolledCourses: EnrolledCourse[];
  quizHistory: QuizResult[];
}

const Profile: React.FC<ProfileProps> = ({ enrolledCourses, quizHistory }) => {
  const achievements = [
    { title: 'Early Bird', icon: 'fa-sun', color: 'text-orange-500', desc: 'Completed 5 lessons before 8 AM' },
    { title: 'Math Whiz', icon: 'fa-calculator', color: 'text-blue-500', desc: 'Scored 90%+ in 3 Math quizzes' },
    { title: '7-Day Streak', icon: 'fa-fire', color: 'text-red-500', desc: 'Kept the fire burning for a full week' },
    { title: 'Quiz Master', icon: 'fa-brain', color: 'text-purple-500', desc: `Aced ${quizHistory.length} curriculum practice tests` },
  ];

  const totalXP = quizHistory.reduce((acc, q) => acc + (q.score * 100), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/40 rounded-full -mr-40 -mt-40 -z-10"></div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thando" className="w-44 h-44 rounded-full border-8 border-white shadow-2xl relative" alt="Profile" />
          <button className="absolute bottom-4 right-4 bg-slate-900 text-white w-12 h-12 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <i className="fa-solid fa-pencil text-xs"></i>
          </button>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Thando Zulu</h2>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 self-center">
              <i className="fa-solid fa-crown"></i> Premium Member
            </span>
          </div>
          <p className="text-slate-400 font-black text-xl mb-8">Grade 11 • IEB South Africa</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
             <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-slate-100 text-center min-w-[120px]">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total XP</p>
               <p className="text-3xl font-black text-indigo-600">{totalXP.toLocaleString()}</p>
             </div>
             <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-slate-100 text-center min-w-[120px]">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Rank</p>
               <p className="text-3xl font-black text-slate-900">Top 5%</p>
             </div>
             <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-slate-100 text-center min-w-[120px]">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Courses</p>
               <p className="text-3xl font-black text-slate-900">{enrolledCourses.length}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <i className="fa-solid fa-chart-line text-indigo-500"></i> Exam Readiness
              </h3>
              <button className="text-indigo-600 font-bold text-sm hover:underline">Full Analytics</button>
            </div>
            
            <div className="space-y-8">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-black text-slate-700">{course.title}</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{course.subject}</p>
                      </div>
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">{course.progress}%</span>
                    </div>
                    <div className="h-5 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 font-medium italic">No curriculum progress yet. Start learning from the marketplace!</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3">
              <i className="fa-solid fa-history text-indigo-500"></i> Practice History
            </h3>
            <div className="space-y-4">
              {quizHistory.length > 0 ? (
                quizHistory.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-indigo-500 font-black">
                         {Math.round((q.score / q.total) * 100)}%
                       </div>
                       <div>
                         <p className="font-bold text-slate-800 leading-tight">{q.topic}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{q.subject} • {q.date}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-indigo-600">+{q.score * 100} XP</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-50">
                  <i className="fa-solid fa-clipboard-question text-4xl mb-3"></i>
                  <p className="font-bold">No quizzes completed yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm h-fit">
            <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3">
              <i className="fa-solid fa-award text-amber-500"></i> Achievements
            </h3>
            <div className="space-y-8">
              {achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-5 group cursor-help">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-indigo-400 transition-colors">
                    <i className={`fa-solid ${ach.icon} ${ach.color} text-3xl group-hover:scale-110 transition-transform`}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-sm">{ach.title}</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 text-white group overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full group-hover:scale-110 transition-transform"></div>
            <h4 className="text-xl font-black mb-4">Account Settings</h4>
            <div className="space-y-4 relative">
              <button className="w-full text-left p-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-between text-sm font-bold">
                Change Curriculum
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
              <button className="w-full text-left p-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-between text-sm font-bold">
                Email Notifications
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </button>
              <button className="w-full text-left p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all flex items-center justify-between text-sm font-bold">
                Sign Out
                <i className="fa-solid fa-arrow-right-from-bracket text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
