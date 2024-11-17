import express from "express";
import { userRouter } from "./modules/users/routes";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./modules/middlewares/errorHandle";
import { PORT } from "./config";
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("combined"));
app.use(errorHandler); //
app.use("/api/v1/user", userRouter);
app.listen(PORT, () => console.warn(`Server is running on port ${PORT}`));
