const express = require("express");
const { connection } = require("./config/db");
const { todoRoute } = require("./routes/todoRoute");
const { userRoute } = require("./routes/userRoute");
const { auth } = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});
app.use("/user", userRoute);
app.use("/todo", auth, todoRoute);

app.listen(8080, async () => {
  try {
    console.log("connecting to db");
    await connection;
    console.log("connectedto db");
  } catch (err) {
    console.log("err to connect with db");
  }
});
