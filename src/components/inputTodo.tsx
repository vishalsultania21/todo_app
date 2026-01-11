import { useState } from "react";
import type { TodoType } from "../todo";
import type todoLinkedList from "../linked_list";
import todoServices from "../todoServices";

interface InputTodoProps {
  setInputVisible: (val: boolean) => void;
  setTodo: (todo: todoLinkedList<TodoType>) => void;
}

function InputTodo({ setInputVisible, setTodo }: InputTodoProps) {
    const [data, setData] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!data.trim()) {
            alert('Please enter a title');
            return;
        }
        todoServices.addTodo(data, description);
        const updatedTodo = todoServices.getTodo();
        setTodo(updatedTodo);
        setData('');
        setDescription('');
        setInputVisible(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Todo</h2>
                
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input
                        id="title"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter task description"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Todo
                    </button>
                    <button
                        type="button"
                        onClick={() => setInputVisible(false)}
                        className="flex-1 bg-gray-300 text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InputTodo;