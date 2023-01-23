import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectToMongoDB from "./DB";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware";
import routes from "./routes";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const port = process.env.PORT;

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// error handler middleware
app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home 😂",
  });
});

connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
