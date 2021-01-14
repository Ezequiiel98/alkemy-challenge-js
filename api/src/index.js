const cors = require('cors');
const express = require('express');

// routes
const authRoutes = require('./routes/auth.routes');
const operationsRoutes = require('./routes/operations.routes');

// database
const database = require('./config/database');
require('./models/Users.model');
require('./models/Valid-tokens.model');
require('./models/Operations.model');

// app
const PORT_APP = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'dev') {
  const dotenv = require('dotenv');
  const morgan = require('morgan');

  dotenv.config();
  app.use(morgan('dev'));
}

// db connection
database.sync()
  .then(() => console.log('database is working'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/operations', operationsRoutes);

app.listen(PORT_APP, () => {
  console.log(`Server on port ${PORT_APP}`);
});
