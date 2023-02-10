
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to MongoDB'));
    