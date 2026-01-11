import type { TodoType } from "./todo";
import TodoLinkedList from "./linked_list"; // Assuming you renamed class to PascalCase
import { v4 as uuidv4 } from 'uuid';

const localStorage_key = "todo";

const todoServices = {
    addTodo: (text: string, description: string): void => {
        // 1. Get current list
        const todos: TodoLinkedList<TodoType> = todoServices.getTodo();
        
        // 2. Create data object
        const newTodo: TodoType = {
            data: text, // Ensure your TodoType interface matches this structure
            description: description,
            completedOrNot: false,
        };
        
        // 3. Generate ID and Add
        let key = uuidv4();
        todos.addNode(newTodo, key);
        
        // 4. Save
        const serializedTodos = todos.getSerializedList();
        localStorage.setItem(localStorage_key, JSON.stringify(serializedTodos));
    },

    getTodo: (): TodoLinkedList<TodoType> => {
        const val: string | null = localStorage.getItem(localStorage_key);
        const list = new TodoLinkedList<TodoType>();
        
        if (!val) return list;

        try {
            const items = JSON.parse(val);
            
            // CRITICAL FIX: Reverse the array before adding.
            // Because addNode() prepends to Head, we must add the LAST item first 
            // to maintain the original order.
            items.reverse().forEach((item: any) => {
                list.addNode(item.data, item.key);
            });
            
            return list;
        } catch (e) {
            console.error("Error parsing todos", e);
            return list;
        }
    },

    updateTodo: (key: string, data: TodoType): void => {
        const todos: TodoLinkedList<TodoType> = todoServices.getTodo();
        todos.updateNode(key, data);
        
        const serializedTodos = todos.getSerializedList();
        localStorage.setItem(localStorage_key, JSON.stringify(serializedTodos));
    },

    deleteTodo: (key: string): void => {
        const todos: TodoLinkedList<TodoType> = todoServices.getTodo();
        todos.deleteNode(key);
        
        const serializedTodos = todos.getSerializedList();
        localStorage.setItem(localStorage_key, JSON.stringify(serializedTodos));
    },
};

export default todoServices;