import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function HabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  
  const categories = ['Salud', 'Bienestar', 'Educación', 'Trabajo', 'General'];

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAdd({ name, category });
    setName('');
    setCategory('General');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Agregar nuevo hábito</h3>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Ej. Beber 8 vasos de agua"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transform transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar hábito</span>
        </button>
      </div>
    </div>
  );
}

export default HabitForm;