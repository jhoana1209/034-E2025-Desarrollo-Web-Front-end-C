import { useState } from "react";

function HabitCard({habit, onToggle}){
    return (
      <div className={`p-3 rounded shadow ${habit.completed ? "bg-green-200" : "bg-white"}`}>
      <p className="font-semibold">{habit.name}</p>
      <button
        className="mt-2 text-sm bg-indigo-500 text-white px-2 py-1 rounded"
        onClick={() => onToggle(habit.id)}
      >
        {habit.completed ? "Desmarcar" : "Marcar completado"}
      </button>
    </div>
    );
}

export default HabitCard;