import { useState } from 'react';
import todoServices from '../todoServices';
import TodoLinkedList from '../linked_list'; 
import type { TodoType } from '../todo';
import { Categories } from './category';
import Search_bar from './searchbar';
import InputTodo from './inputTodo';

interface TodoItemProps {
    data: TodoType;
    todoKey: string;
    setTodo: (todo: TodoLinkedList<TodoType>) => void;
}

function TodoItems({ data, todoKey, setTodo }: TodoItemProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editText, setEditText] = useState(data.data);
    const [editDesc, setEditDesc] = useState(data.description);

    function handleUpdateCompleted() {
        const updatedData = { ...data, completedOrNot: !data.completedOrNot };
        todoServices.updateTodo(todoKey, updatedData);
        setTodo(todoServices.getTodo());
    }

    function handleDeleteTodo() {
        todoServices.deleteTodo(todoKey);
        setTodo(todoServices.getTodo());
    }

    function handleSaveEdit() {
        const updatedData = { ...data, data: editText, description: editDesc };
        todoServices.updateTodo(todoKey, updatedData);
        setTodo(todoServices.getTodo());
        setEdit(false);
    }
    if (edit) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 animate-fade-in">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Edit Title</label>
                <input 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)}
                    className="mt-1 mb-3 w-full border-gray-300 bg-gray-50 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Edit Description</label>
                <textarea 
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="mt-1 mb-4 w-full border-gray-300 bg-gray-50 rounded-lg p-2 text-gray-600 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                />
                <div className="flex gap-3 justify-end">
                    <button onClick={() => setEdit(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition">Cancel</button>
                    <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium shadow-md transition">Save Changes</button>
                </div>
            </div>
        );
    }
    return (
        <div className={`relative group p-6 rounded-xl shadow-sm hover:shadow-xl border transition-all duration-300 ${data.completedOrNot ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-gray-100'}`}>
            
            <div className="flex justify-between items-start mb-2">
                <h5 className={`text-xl font-bold leading-tight ${data.completedOrNot ? 'text-gray-400 line-through decoration-2 decoration-gray-300' : 'text-gray-800'}`}>
                    {data.data}
                </h5>
                <input 
                    type="checkbox" 
                    checked={data.completedOrNot} 
                    onChange={handleUpdateCompleted} 
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
            </div>
            
            <p className={`mb-6 text-sm leading-relaxed ${data.completedOrNot ? 'text-gray-400' : 'text-gray-500'}`}>
                {data.description || "No description provided."}
            </p>

            <div className="flex gap-2 mt-auto">
                <button onClick={handleDeleteTodo} className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-semibold transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                </button>
                <button onClick={() => setEdit(true)} className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-semibold transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Edit
                </button>
            </div>
        </div>
    );
}

function Todocomponent() {
    const [todo, setTodo] = useState<TodoLinkedList<TodoType>>(todoServices.getTodo());
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<string>('All');

    const categories = ['All', 'Completed', 'Pending'];

    const CategoriesArray = categories.map((category) => (
        <Categories 
            key={category} 
            cagtegoriesProps={category} 
            setCurrentTabHandler={setCurrentTab} 
            currentTab={currentTab} 
        />
    ));

    const rawList = todo.getSerializedList();
    
    const displayedTodos = rawList
        .filter((item) => {
            if (currentTab === 'All') return true;
            if (currentTab === 'Completed') return item.data.completedOrNot === true;
            if (currentTab === 'Pending') return item.data.completedOrNot === false;
            return true;
        })
        .filter((item) => {
            if (!searchTerm) return true;
            return item.data.data.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((item) => (
            <TodoItems 
                key={item.key} 
                todoKey={item.key} 
                data={item.data} 
                setTodo={setTodo} 
            />
        ));

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                        Task Master
                    </h1>
                    <p className="text-gray-500">Manage your day efficiently</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {CategoriesArray}
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex-grow md:flex-grow-0">
                            <Search_bar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        </div>
                        <button 
                            onClick={() => setInputVisible(true)} 
                            className="whitespace-nowrap px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center gap-2"
                        >
                            <span className="text-xl leading-none">+</span> Add Task
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                {inputVisible ? (
                    <div className="animate-fade-in-down">
                        <InputTodo setInputVisible={setInputVisible} setTodo={setTodo}/>
                    </div>
                ) : (
                    <>
                        {displayedTodos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedTodos}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg">No tasks found. Add a new one to get started!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>        
    );
}

export default Todocomponent;