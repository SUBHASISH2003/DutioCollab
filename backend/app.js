import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/user.router.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import taskRouter from "./routes/task.router.js";
import updateExpiredTasks from "./automation/taskScheduler.js";
import contactRoutes from "./routes/contactUs.router.js";
import { leaveRoutes } from "./routes/leaveRequest.router.js";
import morgan from "morgan";


const app = express();
config({ path: ".env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);


app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();


app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is working" });
});

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/leave", leaveRoutes);

removeUnverifiedAccounts();
updateExpiredTasks();

app.use(errorMiddleware);
export {app};