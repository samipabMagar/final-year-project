import express from "express";
import connection from "./configs/db.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Test database connection and start the server
connection
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
