import express, { Request, Response } from "express";
import cors from "cors";
import {
  COOKIE_SECRET,
  FRONTEND_URL,
  MONGO_URL,
  PORT,
  IS_PROD,
  COOKIE_NAME,
} from "./env";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import lessonRouter from "./routes/lesson.route";

// instantiate express app
const app = express();

// middlewares
app.use(
  cors({
    origin: IS_PROD ? FRONTEND_URL : "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
    name: COOKIE_NAME,
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: IS_PROD, // SSL only in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 1 week
      httpOnly: true,
      sameSite: "lax",
      // domain: ''
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);

// routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Express and Typescript working! Welcome to Notum backend!");
});

app.use("/api/lessons", lessonRouter)

// mongodb connection
mongoose.connect(MONGO_URL).then(() => {
  console.log("{ MongoDB is running }");
  app.listen(PORT, () => {
    console.log(`{ Server is running at http://localhost:${PORT} }`);
  });
});
