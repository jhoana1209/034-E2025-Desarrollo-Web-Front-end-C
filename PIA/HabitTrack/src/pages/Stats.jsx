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
      <h2 className="text-3xl font-bold text-gray-800">Estadísticas</h2>

      {/* Métricas principales */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-8 h-8 text-blue-500" />
            <span className="text-blue-500 font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalHabits}</p>
          <p className="text-gray-600 text-sm">hábitos creados</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-2">
            <Check className="w-8 h-8 text-green-500" />
            <span className="text-green-500 font-medium">Completados</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{completedHabits}</p>
          <p className="text-gray-600 text-sm">hábitos de hoy</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-purple-500 font-medium">Progreso</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{Math.round(progressPercentage)}%</p>
          <p className="text-gray-600 text-sm">completado hoy</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-8 h-8 text-orange-500" />
            <span className="text-orange-500 font-medium">Mejor racha</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{bestStreak}</p>
          <p className="text-gray-800 text-sm">días consecutivos</p>
        </div>
      </div>

      {/* Progreso por categorías */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Progreso por categoría</h3>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, stats]) => {
              const percentage = (stats.completed / stats.total) * 100;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{category}</span>
                    <span className="text-gray-600 text-sm">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-blue-500 rounded-full"
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
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay estadísticas disponibles</h3>
          <p className="text-gray-600">Agrega algunos hábitos para ver tus estadísticas aquí.</p>
        </div>
      )}
    </div>
  );
}

export default Stats;