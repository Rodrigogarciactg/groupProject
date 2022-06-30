const express = require("express");
const cors = require("cors");

//Added new requirement
//Be sure to "npm install cookie-parser jsonwebtoken bcrypt mongoose-unique-validator dotenv"
const cookieParser = require('cookie-parser');

const app = express();

//Changed cors input
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Added cookieParser to app
app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/item.routes")(app);

app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
