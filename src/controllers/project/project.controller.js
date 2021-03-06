const expressAsyncHandler = require('express-async-handler');
const { Project } = require('../../models/project.model');

const createProject = expressAsyncHandler(async (req, res) => {
  const { title, desc } = req.body;
  const userId = req.user._id;

  const project = await Project.create({
    title,
    desc,
    owner: userId,
    columns: ['Todo', 'In Progress', 'Review', 'Done'],
  });
  if (project) {
    res.status(201);
    res.json({ message: 'project added', status: 'success' });
  } else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
  }
});

const getAProject = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const project = await Project.findById(id);
  if (project) {
    res.status(201);
    res.json({ status: 'success', project });
  } else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
  }
});

const getAllUserProject = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;

  const project = await Project.find({ $or: [{ owner: { $in: id } }, { users: { $in: id } }] });
  if (project) {
    res.status(201);
    res.json({ status: 'success', project });
  } else {
    res.status(500);
    throw new Error('Something went wrong, Please try again.');
  }
});

module.exports = {
  createProject,
  getAProject,
  getAllUserProject,
};
