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

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = ({ name, category }) => {
    const newHabit = {
      id: Date.now(),
      name,
      category,
      completed: false,
      streak: 0
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header simple */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">HabitTrack</h1>
            </div>
            
            <nav className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              {[
                { id: 'home', label: 'Inicio', icon: Star },
                { id: 'habits', label: 'Hábitos', icon: Check },
                { id: 'stats', label: 'Stats', icon: TrendingUp }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`px-4 py-2 rounded-md font-medium flex items-center space-x-2 ${
                    currentPage === id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <Home habits={habits} setCurrentPage={setCurrentPage} />}
        {currentPage === 'habits' && <Habits habits={habits} onAdd={addHabit} onToggle={toggleHabit} onDelete={deleteHabit} />}
        {currentPage === 'stats' && <Stats habits={habits} />}
      </main>
    </div>
  );
}

export default App;