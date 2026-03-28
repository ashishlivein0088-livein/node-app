const todoModel = require('../models/todoModel');
const asyncHandler = require('../utils/asyncHandler');

const getTodos = asyncHandler(async (_req, res) => {
  const todos = await todoModel.getAll();

  res.status(200).json({
    success: true,
    data: todos
  });
});

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Todo title is required.'
    });
  }

  const todo = await todoModel.create({
    title: title.trim(),
    description: description ? description.trim() : ''
  });

  return res.status(201).json({
    success: true,
    message: 'Todo created successfully.',
    data: todo
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (title !== undefined && !String(title).trim()) {
    return res.status(400).json({
      success: false,
      message: 'Todo title cannot be empty.'
    });
  }

  const updatedTodo = await todoModel.update(id, {
    title: title !== undefined ? String(title).trim() : undefined,
    description: description !== undefined ? String(description).trim() : undefined,
    completed: completed !== undefined ? Boolean(completed) : undefined
  });

  if (!updatedTodo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Todo updated successfully.',
    data: updatedTodo
  });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await todoModel.remove(id);

  if (!deletedTodo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Todo deleted successfully.',
    data: deletedTodo
  });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
