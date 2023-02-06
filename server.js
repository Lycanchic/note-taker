const PORT = process.env.PORT || 3001;
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
/*require('dotenv').config();*/

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const dbPath = path.join(__dirname, '/db/db.json');

// Get all notes


app.listen(PORT, () =>
console.log(`Server listening on port ${PORT}`)
);

