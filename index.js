const cors = require("cors");
const express = require("express");
const connectDB = require("./config/DBconfig");
const goalRouter = require("./routes/Goal.routes");
const userRouter = require("./routes/User.routes");

if(process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 4000
connectDB();

app.use(cors());
app.use(express.json());

//Custom Route
app.get('/', (req, res) => {
    res.json({
        msg: 'API Working Successfully'
    });
})

app.use("/api/goals", goalRouter);

app.use("/api/user", userRouter);

app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("Server is up & running");
});
