require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const brandRoutes = require("./routes/brandRoute");
const orderRoutes = require("./routes/orderRoute");
const couponRoutes = require("./routes/couponRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Initialize express app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

// Error Handler Middleware
app.use(errorMiddleware);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
