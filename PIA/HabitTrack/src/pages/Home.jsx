import React from 'react';
import { Check, Target, Zap, ArrowRight } from 'lucide-react';

function Home({ habits, setCurrentPage }) {
  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const progressPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
          Transforma tu vida,
          <br />
          <span className="text-4xl">un hábito a la vez</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Crea rutinas poderosas, rastrea tu progreso y alcanza tus metas con nuestra plataforma intuitiva de seguimiento de hábitos.
        </p>
        <button
          onClick={() => setCurrentPage('habits')}
          className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2 mx-auto"
        >
          <span>Comenzar ahora</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Dashboard rápido */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Completados hoy</p>
              <p className="text-2xl font-bold text-white">{completedToday}/{totalHabits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Progreso diario</p>
              <p className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Mejor racha</p>
              <p className="text-2xl font-bold text-white">{Math.max(...habits.map(h => h.streak), 0)} días</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso animada */}
      {totalHabits > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Progreso de hoy</h3>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-2">
            {completedToday === totalHabits ? '¡Excelente! Has completado todos tus hábitos de hoy.' : `Te faltan ${totalHabits - completedToday} hábitos por completar.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;