import React from 'react';
import { Plus } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';

function Habits({ habits, onAdd, onToggle, onDelete }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Mis Hábitos</h2>
        <div className="text-white/60">
          {habits.filter(h => h.completed).length} de {habits.length} completados
        </div>
      </div>

      <HabitForm onAdd={onAdd} />

      <div className="grid gap-4">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>

      {habits.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No tienes hábitos aún</h3>
          <p className="text-white/60">Agrega tu primer hábito para comenzar tu viaje de mejora personal.</p>
        </div>
      )}
    </div>
  );
}

export default Habits;