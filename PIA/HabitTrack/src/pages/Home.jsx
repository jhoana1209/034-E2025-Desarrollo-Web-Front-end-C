import React from 'react';
import { Check, Target, Zap, ArrowRight } from 'lucide-react';

function Home({ habits, setCurrentPage }) {
  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const progressPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Seguimiento de Hábitos,
          <br />
          <span className="text-4xl"> Un hábito a la vez</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Crea rutinas poderosas, rastrea tu progreso y alcanza tus metas con nuestra plataforma intuitiva de seguimiento de hábitos.
        </p>
        <button
          onClick={() => setCurrentPage('habits')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          <span>Ver mis Hábitos</span>
        </button>
      </div>

      {/* cards de resumen */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completados hoy</p>
              <p className="text-2xl font-bold text-gray-800">{completedToday}/{totalHabits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Progreso diario</p>
              <p className="text-2xl font-bold text-gray-800">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Mejor racha</p>
              <p className="text-2xl font-bold text-gray-800">{Math.max(...habits.map(h => h.streak), 0)} días</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso simple */}
      {totalHabits > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progreso de hoy</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="h-4 bg-blue-500 rounded-fuññ"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-gray-600 text-sm mt-2">
            {completedToday === totalHabits ? '¡Excelente! Has completado todos tus hábitos de hoy.' : `Te faltan ${totalHabits - completedToday} hábitos por completar.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;