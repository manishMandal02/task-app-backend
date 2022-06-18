const expressAsyncHandler = require('express-async-handler');
const { Project } = require('../../models/project.model');

module.exports = expressAsyncHandler(async (req, res) => {
  const { title, desc } = req.body;
  const userId = req.user._id;

  const project = Project.create({
    title,
    desc,
    owner: userId,
  });
  if(project) {
    res.status(201)
    res.json({message: ''})
  }
});
