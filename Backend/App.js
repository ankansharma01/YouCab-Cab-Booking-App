const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const dbConnect = require("./db/db");
const cookieparser = require('cookie-parser')
const userRouter = require('./Routes/user_routes')
const captainRouter  = require('./Routes/captain_routes')
const mapRouter = require('./Routes/maps_routes')
const rideRouter = require('./Routes/ride_routes')
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieparser())


dbConnect()
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use('/users',userRouter)
app.use('/captains',captainRouter)
app.use('/maps',mapRouter)
app.use('/rides',rideRouter)




module.exports = app;
