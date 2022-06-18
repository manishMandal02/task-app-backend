const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/Auth/auth.route');
const projectRoute = require('./src/routes/project/project.route');
const taskRoutes = require('./src/routes/task/task.route');
const commentRoutes = require('./src/routes/comment/comment.route');
const { notFoundError, errorHandler } = require('./src/middleware/error');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running....');
});

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoute);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.green.bold));
