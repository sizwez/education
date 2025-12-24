
import React, { useState } from 'react';
import { generateQuiz } from '../services/gemini';
import { QuizQuestion } from '../types';

const Quizzes: React.FC = () => {
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
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">AI Practice Lab</h2>
        <p className="text-slate-500">Generate personalized mock exams based on the South African CAPS curriculum.</p>

        {!quiz && !isGenerating && (
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 font-medium"
            >
              <option>Mathematics</option>
              <option>Physical Sciences</option>
              <option>Life Sciences</option>
              <option>English FAL</option>
              <option>Economics</option>
              <option>Accounting</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter topic (e.g. Euclidean Geometry, Cellular Respiration)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500"
            />
            <button 
              onClick={startQuiz}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Generate Quiz
            </button>
          </div>
        )}

        {isGenerating && (
          <div className="mt-12 text-center py-20">
            <div className="inline-block animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-slate-600 font-bold animate-pulse">Our AI is crafting your custom practice exam...</p>
          </div>
        )}

        {quiz && !quizFinished && (
          <div className="mt-12 space-y-8 animate-slideUp">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {quiz.length}</span>
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 leading-tight">
              {quiz[currentQuestionIndex].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {quiz[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    selectedAnswer === null 
                      ? 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30' 
                      : idx === quiz[currentQuestionIndex].correctAnswer
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : selectedAnswer === idx
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-slate-50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-semibold">{option}</span>
                    {selectedAnswer !== null && idx === quiz[currentQuestionIndex].correctAnswer && (
                      <i className="fa-solid fa-circle-check text-emerald-500 ml-auto text-xl"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <button 
                onClick={nextQuestion}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl"
              >
                {currentQuestionIndex === quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        )}

        {quizFinished && (
          <div className="mt-12 text-center py-10 animate-scaleIn">
            <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-2">Quiz Complete!</h3>
            <p className="text-slate-500 mb-8">You scored <span className="text-indigo-600 font-bold">{score} out of {quiz?.length}</span></p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setQuiz(null)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Take Another Quiz
              </button>
              <button className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all">
                Review Mistakes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Algebra Master', date: 'Oct 12', score: '80%' },
          { title: 'Organic Chemistry', date: 'Oct 10', score: '100%' },
          { title: 'Newtonian Physics', date: 'Oct 08', score: '60%' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-400">{item.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-black ${parseInt(item.score) >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{item.score}</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Result</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
