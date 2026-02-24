import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connection from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoutes);

// Test database connection and start the server
connection
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return connection.sync();
  
  })
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, ()=> {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
