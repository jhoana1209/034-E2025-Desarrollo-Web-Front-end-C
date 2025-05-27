import React, { useState } from 'react';
import { Target, Check, TrendingUp, Star } from 'lucide-react';
import Home from './pages/Home';
import Habits from './pages/Habits';
import Stats from './pages/Stats';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Beber 8 vasos de agua', completed: false, streak: 5, category: 'Salud' },
    { id: 2, name: 'Meditar 10 minutos', completed: true, streak: 12, category: 'Bienestar' },
    { id: 3, name: 'Leer 30 minutos', completed: false, streak: 3, category: 'Educación' }
  ]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header con efecto glassmorphism */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                HabitTrack
              </h1>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white/5 rounded-full p-2">
              {[
                { id: 'home', label: 'Inicio', icon: Star },
                { id: 'habits', label: 'Hábitos', icon: Check },
                { id: 'stats', label: 'Estadísticas', icon: TrendingUp }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                    currentPage === id ? 'bg-white text-purple-900 shadow-lg scale-105' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm sm:text-base">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && <Home habits={habits} setCurrentPage={setCurrentPage} />}
        {currentPage === 'habits' && <Habits habits={habits} />}
        {currentPage === 'stats' && <Stats habits={habits} />}
      </main>
    </div>
  );
}

export default App;