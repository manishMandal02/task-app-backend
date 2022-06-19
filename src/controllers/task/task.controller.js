const expressAsyncHandler = require("express-async-handler");
const { Project } = require("../../models/project.model");
const { Task } = require("../../models/task.model");

const createTask = expressAsyncHandler(async (req, res) => {
  const { title, desc, project, assignedBy, assignedTo, category, column } =
    req.body;

  const task = await Task.create({
    title,
    desc,
    project,
    assignedBy,
    assignedTo,
    category,
    column,
  });

  if (task) {
    const projectTasks = await Project.findById(project);
    console.log(projectTasks.tasks[0]);
    console.log(task._id);
    projectTasks.tasks.push(task._id);
    await projectTasks.save();
    res.status(201);
    res.json({ message: "task added", status: "success" });
  } else {
    res.status(500);
    throw new Error("Something went wrong, Please try again.");
  }
});

const deleteTask = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const task = await Task.findById(id);
  if (task) {
    await task.remove();
    res.status(201);
    res.json({ message: "task deleted", status: "success" });
  } else {
    res.status(500);
    throw new Error("Something went wrong, Please try again.");
  }
});

const getATask = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const task = await Task.findById(id);

  if (task) {
    res.status(201);
    res.json({ task, status: "success" });
  } else {
    res.status(500);
    throw new Error("Something went wrong, Please try again.");
  }
});

const getAllUserTask = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const task = await Task.findById({ assignedTo: { $in: id } });

  if (task) {
    res.status(201);
    res.json({ task, status: "success" });
  } else {
    res.status(500);
    throw new Error("No task found.");
  }
});

module.exports = { deleteTask, createTask, getATask, getAllUserTask };
