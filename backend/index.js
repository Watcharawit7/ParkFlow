const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT; 

const customerRouter = require("./routes/customer.routes");
const parkingZoneRouter = require("./routes/parkingzone.routes");
const parkingSlotRouter = require("./routes/parkingslot.routes");
const parkingRouter = require("./routes/parking.routes");

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(
  () => {
    console.log("Connection database is Successful");
  },
  (err) => {
    console.error("Connection to mongodb is error", err?.message);
  }
);

app.use("/api/customers", customerRouter);
app.use("/api/parkingzones", parkingZoneRouter);
app.use("/api/parkingslots", parkingSlotRouter);
app.use("/api/parkings", parkingRouter);

app.get('/', (req, res) => {
  res.send('Hello, ParkFlow!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});