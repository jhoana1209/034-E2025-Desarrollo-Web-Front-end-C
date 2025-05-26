import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Stats from "./pages/Stats";

function App() {
  return (
    <Router>
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">HabitTrack</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Inicio</Link>
            <Link to="/habits" className="hover:text-gray-300">Mis Hábitos</Link>
            <Link to="/stast" className="hover:text-gray-300">Estadísticas</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
