const express = require('express');
const app = express();
const port = 3001; 

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const uri = "mongodb+srv://watcharawitsaejung_db_user:1234@booking.3kwjl0f.mongodb.net/";

mongoose.connect(uri).then(
  () => {
    console.log("Connection database is Successful");
  },
  (err) => {
    console.error("Connection to mongodb is error", err?.message);
  }
);

app.get('/', (req, res) => {
  res.send('Hello, ParkFlow!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});