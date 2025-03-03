const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const documentRoutes = require('./routes/documentRoutes');
const authRoutes = require('./routes/authRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scholarships',scholarshipRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/api/documents', documentRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});