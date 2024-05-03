import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { dbconnnection } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://todo-pvuc1d7jz-paraboy6969s-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/applications", applicationRouter);

dbconnnection();

app.use(errorMiddleware);
export default app;
