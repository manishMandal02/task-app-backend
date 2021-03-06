const expressAsyncHandler = require("express-async-handler");
const { Comment } = require("../../models/comment.model");
const { Task } = require("../../models/task.model");

const createComment = expressAsyncHandler(async (req, res) => {
  const { comment, taskId } = req.body;
  const userId = req.user._id;

  const commentCreated = await Comment.create({
    comment,
    user: userId,
    task: taskId,
  });
  if (commentCreated) {
    const task = await Task.findById(taskId);
    task.comments.push(commentCreated._id);
    await task.save();
    res.status(201);
    res.json({ message: "comment added", status: "success" });
  } else {
    res.status(500);
    throw new Error("Something went wrong, Please try again.");
  }
});

const getAllTaskComment = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const comment = Comment.find({ task: taskId });
  console.log(comment._id);
  if (comment) {
    res.status(201);
    res.json({ comment, status: "success" });
  } else {
    res.status(500);
    throw new Error("No comment found.");
  }
});
const deleteComment = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const comment = await Comment.findById(id);
  if (comment) {
    await comment.remove();
    res.status(201);
    res.json({ message: "comment deleted", status: "success" });
  } else {
    res.status(500);
    throw new Error("Something went wrong, Please try again.");
  }
});

module.exports = {
  createComment,
  getAllTaskComment,
  deleteComment,
};
