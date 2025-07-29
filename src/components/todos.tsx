"use client";
import { useState } from "react";
import { useStore } from "@/store/store";

// Modal Component
function UpdateModal({ isOpen, onClose, currentTodo, onUpdate }: {
    isOpen: boolean;
    onClose: () => void;
    currentTodo: string;
    onUpdate: (oldTodo: string, newTodo: string) => void;
}) {
    const [newTodo, setNewTodo] = useState(currentTodo);

    const handleSubmit = (e?: React.KeyboardEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        if (newTodo.trim() !== "") {
            onUpdate(currentTodo, newTodo.trim());
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4 border border-gray-600">
                <h3 className="text-white text-lg font-semibold mb-4">Edit Todo</h3>
                <div>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter todo text..."
                        autoFocus
                    />
                    <div className="flex gap-3 justify-end mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Todos() {
    const todos = useStore((state) => state.todos);
    const deleteTodo = useStore((state) => state.removeTodo);
    const updateTodo = useStore((state) => state.updateTodo);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState("");

    function openUpdateModal(todo: string) {
        setCurrentTodo(todo);
        setIsModalOpen(true);
    }

    function handleUpdate(oldTodo: string, newTodo: string) {
        if (updateTodo) {
            updateTodo(oldTodo, newTodo);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-3 text-white max-w-2xl">
                {todos.map((todo, index) => (
                    <div 
                        key={index} 
                        className="flex items-center justify-between bg-gray-800 border border-gray-600 rounded-lg px-5 py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <span className="flex-1 text-gray-100 mr-4 break-words">{todo}</span>
                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={() => openUpdateModal(todo)}
                                className="bg-blue-500 text-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTodo(todo)}
                                className="bg-red-500 text-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentTodo={currentTodo}
                onUpdate={handleUpdate}
            />
        </>
    );
}