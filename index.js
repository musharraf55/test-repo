const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes");
const Connection = require("./database/db");
const cors = require("cors");

const app = express();
dotenv.config();
Connection();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + ", URL - " + req.url);
  next();
});

app.use("/api/v1", router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
