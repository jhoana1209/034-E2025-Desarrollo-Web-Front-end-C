import React from 'react';
import { Plus } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';

function Habits({ habits, onAdd, onToggle, onDelete }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Mis Hábitos</h2>
        <div className="text-gray-600">
          {habits.filter(h => h.completed).length} de {habits.length} completados
        </div>
      </div>

      <HabitForm onAdd={onAdd} />

      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay hábitos</h3>
          <p className="text-gray-600">Agrega tu primer hábito para empezar.</p>
        </div>
      )}
    </div>
  );
}

export default Habits;