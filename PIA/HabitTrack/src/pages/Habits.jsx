import { useState, useEffect } from "react";
import HabitForm from "../components/HabitForm";
import HabitCard from "../components/HabitCard";

function Habits() {
  const [habits, setHabits] = useState([]);

  // Cargar hábitos del localStorage
  useEffect(() => {
    const stored = localStorage.getItem("habits");
    if (stored) {
      setHabits(JSON.parse(stored));
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const toggleHabit = (id) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updated);
  };

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold">Mis Hábitos</h2>
      <HabitForm onAdd={addHabit} />
      <div className="grid gap-4 mt-4">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />
        ))}
      </div>
    </main>
  );
}

export default Habits;
