
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import AITutorPage from './pages/AITutorPage';
import Profile from './pages/Profile';
import Quizzes from './pages/Quizzes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { EnrolledCourse, QuizResult } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persistence Layer
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(() => {
    const saved = localStorage.getItem('edupulse_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(() => {
    const saved = localStorage.getItem('edupulse_quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('edupulse_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('edupulse_quizzes', JSON.stringify(quizHistory));
  }, [quizHistory]);

  const enrollInCourse = (course: any) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      const newCourse: EnrolledCourse = {
        ...course,
        progress: 0,
        lastAccessed: new Date().toISOString()
      };
      setEnrolledCourses([newCourse, ...enrolledCourses]);
      return true;
    }
    return false;
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizHistory([result, ...quizHistory]);
  };

  return (
    <HashRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header onSearch={setSearchQuery} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F8FAFC]">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  enrolledCourses={enrolledCourses} 
                  quizHistory={quizHistory} 
                />
              } />
              <Route path="/marketplace" element={
                <Marketplace 
                  searchQuery={searchQuery} 
                  onEnroll={enrollInCourse}
                  enrolledIds={enrolledCourses.map(c => c.id)}
                />
              } />
              <Route path="/tutor" element={<AITutorPage />} />
              <Route path="/quizzes" element={
                <Quizzes onQuizComplete={addQuizResult} />
              } />
              <Route path="/profile" element={
                <Profile 
                  enrolledCourses={enrolledCourses} 
                  quizHistory={quizHistory} 
                />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
