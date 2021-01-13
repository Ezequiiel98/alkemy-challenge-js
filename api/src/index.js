const cors = require('cors');
const express = require('express');

const database = require('./config/database');
require('./models/Users.model');

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

app.listen(PORT_APP, () => {
  console.log(`Server on port ${PORT_APP}`);
});
