const connectToMongo = require("./db");
const express = require("express");
let cors = require("cors");
const helmet = require("helmet");

connectToMongo();

const app = express();
const port = 5000;

// Use helmet to secure your app by setting various HTTP headers
app.use(helmet());

// Middleware to handle CORS and parse JSON requests
app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

app.listen(port, () => {
  console.log(`Backend listening on port http://localhost:${port}`);
});
