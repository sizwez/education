
import React, { useState } from 'react';
import { generateQuiz } from '../services/gemini';
import { QuizQuestion, QuizResult } from '../types';

interface QuizzesProps {
  onQuizComplete: (result: QuizResult) => void;
}

const Quizzes: React.FC<QuizzesProps> = ({ onQuizComplete }) => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setQuiz(null);
    setQuizFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    
    const data = await generateQuiz(subject, topic);
    setQuiz(data);
    setIsGenerating(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quiz![currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz!.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const result: QuizResult = {
        id: Math.random().toString(36).substr(2, 9),
        topic,
        subject,
        score,
        total: quiz!.length,
        date: new Date().toLocaleDateString()
      };
      onQuizComplete(result);
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-bl-full -z-10"></div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">AI Practice Lab 🔬</h2>
        <p className="text-slate-500 font-medium">Personalized mock exams based on the South African CAPS curriculum.</p>

        {!quiz && !isGenerating && (
          <div className="mt-10 flex flex-col md:flex-row gap-4 p-2 bg-slate-50 rounded-[2rem] border border-slate-100">
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-6 py-4 rounded-2xl border-none bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700"
            >
              <option>Mathematics</option>
              <option>Physical Sciences</option>
              <option>Life Sciences</option>
              <option>English FAL</option>
              <option>Accounting</option>
            </select>
            <input 
              type="text" 
              placeholder="Topic (e.g. Euclidean Geometry)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl border-none bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-100 font-medium"
            />
            <button 
              onClick={startQuiz}
              disabled={!topic.trim()}
              className="bg-indigo-600 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              Generate Exam
            </button>
          </div>
        )}

        {isGenerating && (
          <div className="mt-12 text-center py-20 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute top-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-900 font-black text-xl mb-1">Crafting your mock exam...</p>
            <p className="text-slate-400 text-sm font-medium">Our AI is analyzing the {subject} curriculum for you.</p>
          </div>
        )}

        {quiz && !quizFinished && (
          <div className="mt-12 space-y-10 animate-slideUp">
            <div className="flex items-center justify-between bg-slate-50 px-6 py-4 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">In Progress</span>
                <span className="text-sm font-black text-slate-800">Question {currentQuestionIndex + 1} of {quiz.length}</span>
              </div>
              <div className="w-32 h-2.5 bg-white rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-800 leading-tight">
              {quiz[currentQuestionIndex].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {quiz[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`p-6 rounded-3xl border-2 text-left transition-all group ${
                    selectedAnswer === null 
                      ? 'border-slate-100 bg-white hover:border-indigo-400 hover:bg-indigo-50/50' 
                      : idx === quiz[currentQuestionIndex].correctAnswer
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : selectedAnswer === idx
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-slate-50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                      selectedAnswer === null 
                        ? 'bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white' 
                        : idx === quiz[currentQuestionIndex].correctAnswer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold flex-1">{option}</span>
                    {selectedAnswer !== null && idx === quiz[currentQuestionIndex].correctAnswer && (
                      <i className="fa-solid fa-circle-check text-emerald-600 text-2xl"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <button 
                onClick={nextQuestion}
                className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
              >
                {currentQuestionIndex === quiz.length - 1 ? 'See Results' : 'Next Question'}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        )}

        {quizFinished && (
          <div className="mt-12 text-center py-10 animate-scaleIn">
            <div className="w-32 h-32 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
              <i className="fa-solid fa-trophy animate-bounce"></i>
            </div>
            <h3 className="text-4xl font-black text-slate-800 mb-2">Great Work, Thando!</h3>
            <p className="text-slate-500 font-medium mb-10">You earned <span className="text-indigo-600 font-black">+{score * 100} XP</span> for completing the {topic} quiz.</p>
            
            <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 border border-slate-100 flex items-center justify-around">
               <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                  <p className="text-4xl font-black text-indigo-600">{score}/{quiz?.length}</p>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Percentage</p>
                  <p className="text-4xl font-black text-slate-900">{Math.round((score / quiz!.length) * 100)}%</p>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setQuiz(null)}
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Take New Quiz
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95">
                Review Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
