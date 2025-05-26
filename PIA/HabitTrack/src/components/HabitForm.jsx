import { useState } from "react";
import { v4 as uuidv4} from "uuid"

function HabitFrom({ onAdd}){
    const [name, setName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (!name.trim()) return;

        const newHabit = {
            id: uuidv4(),
            name,
            completed: false    
        };

        onAdd(newHabit);
        setName("")
    };

    return(
        <form onSubmit={handleSubmit} className="flex gap.2 mt-4">
            <input 
            className="border px-2 py-1 rounded" 
            placeholder="Ej. Beber agua"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-green-500 text-white px-3 rounded">Agregar</button>
        </form>
    );
}

export default HabitFrom; 