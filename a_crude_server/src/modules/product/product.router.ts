import express from "express";
import { ProductController } from "./product.controller";
import { validate } from "../../validation";
import {
  createProductSchema,
  findAllProductSchema,
  findProductByIdSchema,
  updateProductSchema,
} from "./product.schema";

export const productRouter = express.Router();
const productController = ProductController();

productRouter.get(
  "/:id",
  validate(findProductByIdSchema),
  productController.findOne
);
productRouter.get(
  "",
  validate(findAllProductSchema),
  productController.findAll
);
productRouter.post("", validate(createProductSchema), productController.create);
productRouter.patch(
  "/:id",
  validate(updateProductSchema),
  productController.update
);
productRouter.delete(
  "/:id",
  validate(findProductByIdSchema),
  productController.remove
);
