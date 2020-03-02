//bring in express
const express = require('express');

//bring is config
const connectDB = require('./config/db');
//initilize express
const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//create get end point
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to contact keeper app' });
});

//define routes, we want each route to start with /api
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

//delcare & initilize port variable
const PORT = process.env.PORT || 5000;

//allow  express to start listening on port 5000 and display a message
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
