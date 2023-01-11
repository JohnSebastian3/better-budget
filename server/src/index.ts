import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser'
const dashboardRoutes = require("./routes/dashboard");
const homeRoutes = require("./routes/home");

dotenv.config();
const app = express();

// Passport config
require("./config/passport")(passport);

app.use(cors({ origin: "https://better-budget.netlify.app/", credentials: true}))
// app.use(cors({ origin: "http://localhost:3000", credentials: true}))

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = ['http://localhost:3000'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

// // Then pass these options to cors:
// app.use(cors(options));

// app.use(cors({credentials: true, origin: true}));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 6},
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

app.use(cookieParser());
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", homeRoutes);
app.use("/dashboard", dashboardRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URL!).then(
  () => {
    console.log(`Server running on port ${process.env.PORT}`);
    app.listen(process.env.PORT!);
  },
  (err: Error) => {
    if (err) throw err;
    console.log("Connected to Database");
  }
);
