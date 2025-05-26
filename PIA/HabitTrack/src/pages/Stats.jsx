import { useEffect, useState } from "react";

function Stats() {
  const [total, setTotal] = useState(0);
  const [completados, setCompletados] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("habits");
    if (stored) {
      const habits = JSON.parse(stored);
      setTotal(habits.length);
      setCompletados(habits.filter((h) => h.completed).length);
    }
  }, []);

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold">Estadísticas</h2>
      <p className="mt-2">Total de hábitos: {total}</p>
      <p>Hábitos completados: {completados}</p>
      <p>Progreso: {total === 0 ? "0%" : `${Math.round((completados / total) * 100)}%`}</p>
    </main>
  );
}

export default Stats;
