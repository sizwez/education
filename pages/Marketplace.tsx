
import React, { useState } from 'react';
import { GradeLevel, Course } from '../types';

const MOCK_COURSES: Course[] = [
  { id: '1', title: 'Mathematics Grade 11: Calculus Foundations', subject: 'Mathematics', grade: GradeLevel.FET, curriculum: 'IEB', instructor: 'Dr. Mthembu', price: 450, rating: 4.8, image: 'https://picsum.photos/seed/math/400/250', description: 'Master the core concepts of differential calculus required for IEB exams.', modulesCount: 12 },
  { id: '2', title: 'Physical Sciences: Newton\'s Laws Deep Dive', subject: 'Physics', grade: GradeLevel.FET, curriculum: 'NSC', instructor: 'Prof. Naidoo', price: 380, rating: 4.9, image: 'https://picsum.photos/seed/physics/400/250', description: 'Comprehensive physics tutorials focused on mechanics and motion.', modulesCount: 8 },
  { id: '3', title: 'Coding for High Schoolers: Python Basics', subject: 'IT', grade: GradeLevel.SENIOR, curriculum: 'General', instructor: 'Kevin de Bruyn', price: 299, rating: 4.7, image: 'https://picsum.photos/seed/code/400/250', description: 'A beginner-friendly introduction to programming with real-world projects.', modulesCount: 15 },
  { id: '4', title: 'Life Sciences Grade 12: Genetics & Evolution', subject: 'Life Sciences', grade: GradeLevel.FET, curriculum: 'NSC', instructor: 'Mrs. Khumalo', price: 420, rating: 4.6, image: 'https://picsum.photos/seed/biology/400/250', description: 'Detailed exploration of heredity, DNA profiling, and evolutionary theory.', modulesCount: 10 },
  { id: '5', title: 'Economics 101: South African Markets', subject: 'Economics', grade: GradeLevel.TERTIARY, curriculum: 'General', instructor: 'Lindiwe Sisulu', price: 550, rating: 4.9, image: 'https://picsum.photos/seed/finance/400/250', description: 'Understanding macroeconomics through the lens of emerging market challenges.', modulesCount: 20 },
];

interface MarketplaceProps {
  searchQuery: string;
  onEnroll: (course: Course) => boolean;
  enrolledIds: string[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ searchQuery, onEnroll, enrolledIds }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showToast, setShowToast] = useState(false);

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                          course.curriculum === activeFilter || 
                          course.subject === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEnroll = (course: Course) => {
    const success = onEnroll(course);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {showToast && (
        <div className="fixed top-20 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-slideIn">
          <i className="fa-solid fa-circle-check text-emerald-400"></i>
          <p className="font-bold">Successfully enrolled! Check your dashboard.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Course Marketplace</h2>
          <p className="text-slate-500 font-medium">Quality South African education from top-tier educators.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'NSC', 'IEB', 'Mathematics', 'Physics', 'IT'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-indigo-600 shadow-sm uppercase tracking-widest">
                    {course.curriculum}
                  </span>
                  <span className="bg-indigo-600/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-white shadow-sm uppercase tracking-widest">
                    {course.grade}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400 text-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star ${i >= Math.floor(course.rating) ? 'opacity-30' : ''}`}></i>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{course.rating} (120+ students)</span>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 min-h-[3rem] leading-tight">{course.title}</h4>
                <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Price</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">R{course.price}</p>
                  </div>
                  {enrolledIds.includes(course.id) ? (
                    <button className="bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 cursor-default">
                      <i className="fa-solid fa-check"></i>
                      Enrolled
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course)}
                      className="bg-slate-900 text-white hover:bg-indigo-600 px-5 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg shadow-slate-200 active:scale-95"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <i className="fa-solid fa-face-frown text-slate-300 text-5xl mb-4"></i>
            <h3 className="text-xl font-bold text-slate-800">No courses found</h3>
            <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
