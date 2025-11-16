import { init, chat } from '../src/memagent.js';

// Initialize MemAgent SDK
init();

let todos = JSON.parse(localStorage.getItem('memagent_todos') || '[]');

const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button onclick="toggleTodo(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(div);
    });
}

async function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) return;

    // Use AI to suggest improvements or categorize the task
    const prompt = `I'm adding a new todo: "${text}". Can you give me a brief suggestion or categorization for it?`;
    
    try {
        const result = await chat(prompt);
        const aiSuggestion = result.response;
        // The interaction is automatically saved by the backend.

        // Add the todo
        todos.push({ text, completed: false, timestamp: Date.now() });
        localStorage.setItem('memagent_todos', JSON.stringify(todos));

        newTodoInput.value = '';
        renderTodos();

        // Show AI suggestion
        alert(`AI Suggestion: ${aiSuggestion}`);

    } catch (error) {
        alert('Error getting AI suggestion: ' + error.message);
        // Still add the todo even if AI fails
        todos.push({ text, completed: false, timestamp: Date.now() });
        localStorage.setItem('memagent_todos', JSON.stringify(todos));
        newTodoInput.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('memagent_todos', JSON.stringify(todos));
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('memagent_todos', JSON.stringify(todos));
    renderTodos();
}

// Make functions global for onclick handlers
window.addTodo = addTodo;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;

// Initial render
renderTodos();
