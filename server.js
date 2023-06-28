const express = require("express");
const cors = require("cors");
const courierRouter = require("./routes/courier.route");
require("dotenv").config();
const PORT = process.env.REACT_APP_BACKEND_SERVER_PORT;
const server = express();

server.use(express.json());
server.use(cors());

server.use("/courier", courierRouter);

server.use("/", (req, res) => {
  try {
    res
      .status(200)
      .send(
        `<h2 style="color:green;font-size:26px;margin:20px auto;">Welcome To Courier Dispatch Application</h2>`
      );
  } catch (error) {
    res.status(404).send(error);
  }
});

server.listen(PORT, async function () {
  try {
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log("server error", error);
  }
});

module.exports = server;
