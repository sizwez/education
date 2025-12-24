
import React, { useState } from 'react';
import { GradeLevel, Course } from '../types';

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Mathematics Grade 11: Calculus Foundations',
    subject: 'Mathematics',
    grade: GradeLevel.FET,
    curriculum: 'IEB',
    instructor: 'Dr. Mthembu',
    price: 450,
    rating: 4.8,
    image: 'https://picsum.photos/seed/math/400/250',
    description: 'Master the core concepts of differential calculus required for IEB exams.',
    modulesCount: 12
  },
  {
    id: '2',
    title: 'Physical Sciences: Newton\'s Laws Deep Dive',
    subject: 'Physics',
    grade: GradeLevel.FET,
    curriculum: 'NSC',
    instructor: 'Prof. Naidoo',
    price: 380,
    rating: 4.9,
    image: 'https://picsum.photos/seed/physics/400/250',
    description: 'Comprehensive physics tutorials focused on mechanics and motion.',
    modulesCount: 8
  },
  {
    id: '3',
    title: 'Coding for High Schoolers: Python Basics',
    subject: 'IT / Computer Science',
    grade: GradeLevel.SENIOR,
    curriculum: 'General',
    instructor: 'Kevin de Bruyn',
    price: 299,
    rating: 4.7,
    image: 'https://picsum.photos/seed/code/400/250',
    description: 'A beginner-friendly introduction to programming with real-world projects.',
    modulesCount: 15
  },
  {
    id: '4',
    title: 'Life Sciences Grade 12: Genetics & Evolution',
    subject: 'Life Sciences',
    grade: GradeLevel.FET,
    curriculum: 'NSC',
    instructor: 'Mrs. Khumalo',
    price: 420,
    rating: 4.6,
    image: 'https://picsum.photos/seed/biology/400/250',
    description: 'Detailed exploration of heredity, DNA profiling, and evolutionary theory.',
    modulesCount: 10
  }
];

const Marketplace: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Course Marketplace</h2>
          <p className="text-slate-500">Quality education at affordable prices.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'NSC', 'IEB', 'Grade 12', 'Skills'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
                {course.curriculum}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mb-2">
                <i className="fa-solid fa-star"></i>
                <span className="text-slate-700">{course.rating}</span>
                <span className="text-slate-400 font-normal">(120+ reviews)</span>
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{course.title}</h4>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400">Course Price</p>
                  <p className="text-xl font-bold text-slate-900">R{course.price}</p>
                </div>
                <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
