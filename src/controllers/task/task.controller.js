const expressAsyncHandler = require('express-async-handler');
const { Task } = require('../../models/task.model');

const createTask = expressAsyncHandler(async (req, res) => {
  const { title, desc, projectId, assignedBy, assignedTo, category, columnId } = req.body;

  const task = Task.create({
    title,
    desc,
    projectId,
    assignedBy,
    assignedTo,
    category,
    columnId,
  });

  if (task) {
    res.status(201);
    res.json({ message: 'task added', status: 'success' });
  } else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
  }
});

const deleteTask = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;

  const task = Task.findById(id);
  if (task) {
    await task.remove();
    res.status(201);
    res.json({ message: 'task deleted', status: 'success' });
} else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
}
});

const getATask = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;

  const task = Task.findById(id);

  if (task) {
    res.status(201);
    res.json({ task, status: 'success' });
  } else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
  }
});

const getAllUserTask = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;

  const task = Task.findById({ assignedTo: { $in: id } });

  if (task) {
    res.status(201);
    res.json({ task, status: 'success' });
  } else {
    res.status(500);
    throw new Error('No task found.');
  }
});

module.exports = { deleteTask, createTask, getATask, getAllUserTask };
