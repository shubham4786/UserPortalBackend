const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userImfoRoute = require("./routes/userImfo.js");
const userRoute = require("./routes/user.js");

const authMiddleware = require("./middleware/auth.js");
const app = express();

app.use(cors());

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://shubham4786:Shubham99@cluster0.vdmkfnd.mongodb.net/userDB?retryWrites=true&w=majority"
  );
};

app.use(express.json());

app.use("/api/v1/profile", authMiddleware, userImfoRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello Shubham!");
});

connectdb()
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.log("Error Connecting MongoDB", err));

const portNo = 5000;
app.listen(portNo, () => {
  console.log("Server is up and runing on port", portNo);
});
