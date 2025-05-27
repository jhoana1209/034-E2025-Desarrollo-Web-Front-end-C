import React from 'react';
import { Check, Zap } from 'lucide-react';

function HabitCard({ habit, onToggle, onDelete }) {
  const categoryColors = {
    'Salud': 'bg-green-100 text-green-800',
    'Bienestar': 'bg-purple-100 text-purple-800',
    'Educación': 'bg-blue-100 text-blue-800',
    'Trabajo': 'bg-orange-100 text-orange-800',
    'default': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border ${habit.completed ? 'border-green-200 bg-green-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(habit.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              habit.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {habit.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-semibold ${habit.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {habit.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[habit.category] || categoryColors.default}`}>
                {habit.category || 'General'}
              </span>
              <span className="text-gray-600 text-sm flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>{habit.streak} días</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggle(habit.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              habit.completed
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {habit.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;