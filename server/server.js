const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const tourRoutes = require("./routes/tourRoutes");
const detailRoutes = require("./routes/detailRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const connectDb = require("./config/db");
// var bodyParser = require('body-parser')
// bodyParser.json([options])
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
connectDb();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth/travel", authRoutes);
app.use("/api/package/travel", packageRoutes);
app.use("/api/tour/travel", tourRoutes);
app.use("/api/multi/travel", detailRoutes);
app.use("/api/contact/travel", contactRoutes);
app.use("/api/review/travel", reviewRoutes);
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server connected with ${PORT}`);
});
