import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connection from "./configs/db.js";
import routes from "./routes/index.js";

// Load environment variables
dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8001;

// Routes
app.get("/", (req, res) => {
  res.send("eDermaCare API - Server is running");
});

// Mount all API routes
app.use("/api", routes);

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
