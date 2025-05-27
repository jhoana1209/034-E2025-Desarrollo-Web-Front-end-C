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
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar nuevo hábito</h3>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Ej. Beber 8 vasos de agua"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar hábito</span>
        </button>
      </div>
    </div>
  );
}

export default HabitForm;