import express, { Request, Response } from "express";
import { productRouter } from "./modules/product/product.router";
import { config } from "./config";

const app = express();
const PORT = config.port;

app.use(express.json());

app.use("/products", productRouter);

app.get("/healthz", (req: Request, res: Response) => {
  res.send("Ok");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
