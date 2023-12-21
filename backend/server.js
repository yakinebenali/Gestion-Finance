const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/DataBase.js");
const router = require("./routes/index.js");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

db.authenticate()
  .then(() => {
    console.log('Database Connected...');
  })
  .catch(error => {
    console.error(error);
  });

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));
