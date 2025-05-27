import { useState } from "react";

import React from 'react';
import { Check, Zap } from 'lucide-react';

function HabitCard({ habit, onToggle, onDelete }) {
  const categoryColors = {
    'Salud': 'from-green-500 to-emerald-600',
    'Bienestar': 'from-purple-500 to-indigo-600',
    'Educación': 'from-blue-500 to-cyan-600',
    'Trabajo': 'from-orange-500 to-red-600',
    'default': 'from-gray-500 to-slate-600'
  };

  return (
    <div className={`group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${habit.completed ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(habit.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              habit.completed
                ? 'bg-green-500 border-green-500 scale-110'
                : 'border-white/40 hover:border-green-400 hover:bg-green-400/20'
            }`}
          >
            {habit.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-semibold transition-all ${habit.completed ? 'text-white/60 line-through' : 'text-white'}`}>
              {habit.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${categoryColors[habit.category] || categoryColors.default} text-white`}>
                {habit.category || 'General'}
              </span>
              <span className="text-white/60 text-sm flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>{habit.streak} días</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onToggle(habit.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              habit.completed
                ? 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30'
                : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
            }`}
          >
            {habit.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;