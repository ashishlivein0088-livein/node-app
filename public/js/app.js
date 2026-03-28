const storageKeys = {
  theme: 'todoAppTheme'
};

const themeToggle = document.getElementById('themeToggle');
const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
const appMessage = document.getElementById('appMessage');
const todoStats = document.getElementById('todoStats');
const cancelEditButton = document.getElementById('cancelEditButton');
const formTitle = document.getElementById('formTitle');
const submitButton = document.getElementById('submitButton');
const todoIdField = document.getElementById('todoId');
const titleField = document.getElementById('title');
const descriptionField = document.getElementById('description');

const getStoredTheme = () => {
  return localStorage.getItem(storageKeys.theme) || 'light';
};

const applyTheme = (theme) => {
  document.body.classList.toggle('dark', theme === 'dark');
};

const setMessage = (message, type = '') => {
  appMessage.textContent = message;
  appMessage.className = `status-message${type ? ` is-${type}` : ''}`;
};

const clearMessage = () => setMessage('');

const resetForm = () => {
  todoForm.reset();
  todoIdField.value = '';
  formTitle.textContent = 'Add a new todo';
  submitButton.textContent = 'Add Todo';
  cancelEditButton.hidden = true;
};

const formatDate = (value) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
};

const updateStats = (todos) => {
  const completedTodos = todos.filter((todo) => todo.completed).length;
  todoStats.textContent = `${todos.length} items • ${completedTodos} completed`;
};

const createTodoCard = (todo) => {
  const card = document.createElement('article');
  card.className = `todo-card${todo.completed ? ' is-complete' : ''}`;

  card.innerHTML = `
    <div class="todo-top">
      <div>
        <span class="status-chip ${todo.completed ? 'status-chip--complete' : ''}">
          ${todo.completed ? 'Completed' : 'In progress'}
        </span>
        <h3 class="todo-title">${todo.title}</h3>
        <p class="todo-description">${todo.description || 'No description provided.'}</p>
      </div>
      <p class="todo-meta">Updated ${formatDate(todo.updatedAt)}</p>
    </div>

    <div class="action-row">
      <button class="chip-button" type="button" data-action="toggle">
        ${todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button class="chip-button" type="button" data-action="edit">Edit</button>
      <button class="chip-button chip-button--danger" type="button" data-action="delete">Delete</button>
    </div>
  `;

  card.querySelector('[data-action="toggle"]').addEventListener('click', () => {
    handleToggleTodo(todo);
  });

  card.querySelector('[data-action="edit"]').addEventListener('click', () => {
    startEditTodo(todo);
  });

  card.querySelector('[data-action="delete"]').addEventListener('click', () => {
    handleDeleteTodo(todo.id);
  });

  return card;
};

const renderTodos = (todos) => {
  todoList.innerHTML = '';
  updateStats(todos);

  if (!todos.length) {
    todoList.innerHTML = `
      <div class="empty-state">
        <h3>No todos yet</h3>
        <p>Create your first task to get started.</p>
      </div>
    `;
    return;
  }

  todos.forEach((todo) => {
    todoList.appendChild(createTodoCard(todo));
  });
};

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong.');
  }

  return result;
};

const loadTodos = async () => {
  try {
    const result = await apiRequest('/api/todos');
    renderTodos(result.data);
  } catch (error) {
    setMessage(error.message, 'error');
  }
};

const startEditTodo = (todo) => {
  todoIdField.value = todo.id;
  titleField.value = todo.title;
  descriptionField.value = todo.description;
  formTitle.textContent = 'Edit todo';
  submitButton.textContent = 'Save Changes';
  cancelEditButton.hidden = false;
  titleField.focus();
  clearMessage();
};

const handleToggleTodo = async (todo) => {
  try {
    await apiRequest(`/api/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: !todo.completed
      })
    });

    setMessage('Todo status updated.', 'success');
    await loadTodos();
  } catch (error) {
    setMessage(error.message, 'error');
  }
};

const handleDeleteTodo = async (id) => {
  try {
    await apiRequest(`/api/todos/${id}`, {
      method: 'DELETE'
    });

    setMessage('Todo deleted.', 'success');
    await loadTodos();
    resetForm();
  } catch (error) {
    setMessage(error.message, 'error');
  }
};

todoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    title: titleField.value.trim(),
    description: descriptionField.value.trim()
  };

  if (!payload.title) {
    setMessage('Title is required.', 'error');
    return;
  }

  try {
    const isEditing = Boolean(todoIdField.value);

    await apiRequest(isEditing ? `/api/todos/${todoIdField.value}` : '/api/todos', {
      method: isEditing ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    });

    setMessage(isEditing ? 'Todo updated.' : 'Todo created.', 'success');
    resetForm();
    await loadTodos();
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

cancelEditButton.addEventListener('click', () => {
  resetForm();
  clearMessage();
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem(storageKeys.theme, nextTheme);
  applyTheme(nextTheme);
});

applyTheme(getStoredTheme());
resetForm();
loadTodos();
