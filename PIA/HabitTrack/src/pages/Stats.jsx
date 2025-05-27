import React from 'react';
import { Target, Check, TrendingUp, Zap } from 'lucide-react';

function Stats({ habits }) {
  const totalHabits = habits.length;
  const completedHabits = habits.filter(h => h.completed).length;
  const progressPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
  const bestStreak = Math.max(...habits.map(h => h.streak), 0);
  const avgStreak = habits.length > 0 ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length) : 0;

  const categoryStats = habits.reduce((acc, habit) => {
    const cat = habit.category || 'General';
    if (!acc[cat]) acc[cat] = { total: 0, completed: 0 };
    acc[cat].total++;
    if (habit.completed) acc[cat].completed++;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Estadísticas</h2>

      {/* Métricas principales */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalHabits}</p>
          <p className="text-white/60 text-sm">hábitos creados</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Check className="w-8 h-8 text-green-400" />
            <span className="text-green-400 font-medium">Completados</span>
          </div>
          <p className="text-3xl font-bold text-white">{completedHabits}</p>
          <p className="text-white/60 text-sm">hábitos de hoy</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 font-medium">Progreso</span>
          </div>
          <p className="text-3xl font-bold text-white">{Math.round(progressPercentage)}%</p>
          <p className="text-white/60 text-sm">completado hoy</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-8 h-8 text-orange-400" />
            <span className="text-orange-400 font-medium">Mejor racha</span>
          </div>
          <p className="text-3xl font-bold text-white">{bestStreak}</p>
          <p className="text-white/60 text-sm">días consecutivos</p>
        </div>
      </div>

      {/* Progreso por categorías */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6">Progreso por categoría</h3>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, stats]) => {
              const percentage = (stats.completed / stats.total) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{category}</span>
                    <span className="text-white/60 text-sm">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {totalHabits === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No hay estadísticas disponibles</h3>
          <p className="text-white/60">Agrega algunos hábitos para ver tus estadísticas aquí.</p>
        </div>
      )}
    </div>
  );
}

export default Stats;