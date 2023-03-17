const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const swaggerDocument = yaml.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
// mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main().catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error!"));
db.once("open", function () {
  console.log("Connected to DB");
});

app.use("/employees", require("./routes/employee"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
