const { v4: uuidv4 } = require('uuid');

class TodoModel {
  constructor() {
    this.todos = [
      {
        id: uuidv4(),
        title: 'Review the project structure',
        description: 'Explore the MVC layout and API flow.',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Toggle dark mode',
        description: 'Try the theme switcher and check persistence.',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  async getAll() {
    return [...this.todos].sort((firstTodo, secondTodo) => {
      return Number(secondTodo.completed) - Number(firstTodo.completed);
    });
  }

  async create({ title, description }) {
    const timestamp = new Date().toISOString();

    const todo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.todos.unshift(todo);

    return todo;
  }

  async update(id, updates) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const currentTodo = this.todos[todoIndex];

    const updatedTodo = {
      ...currentTodo,
      ...(updates.title !== undefined ? { title: updates.title } : {}),
      ...(updates.description !== undefined ? { description: updates.description } : {}),
      ...(updates.completed !== undefined ? { completed: updates.completed } : {}),
      updatedAt: new Date().toISOString()
    };

    this.todos[todoIndex] = updatedTodo;

    return updatedTodo;
  }

  async remove(id) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const [deletedTodo] = this.todos.splice(todoIndex, 1);
    return deletedTodo;
  }
}

module.exports = new TodoModel();
