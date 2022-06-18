const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/auth.route');
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

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.green.bold));
