"use client";

import { useStore } from "@/store/store";
import { useState } from "react";

export default function Input() {
    const [input, setInput] = useState("");
    const addTodo = useStore((state) => state.addTodo);
    const todos = useStore((state) => state.todos);

    console.log("Todos in Input:", todos);
    return (
        <div className="flex items-center gap-2">
            <input type="text" className="border border-gray-300 rounded px-4 py-2" placeholder="Enter a task" size={30} value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={() => {addTodo(input); setInput("")}} className="bg-white text-black rounded px-4 py-2 cursor-pointer">Add</button>
        </div>
    );
}