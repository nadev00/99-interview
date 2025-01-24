import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { wrapperGroup } from "../../utils/asyncWrapper";

export const ProductController = () => {
  const productService = ProductService();
  const create = async (req: Request, res: Response) => {
    const data = await productService.create(req.body);
    res.json(data);
  };

  const findAll = async (req: Request, res: Response) => {
    const data = await productService.findAll(req.query);
    res.json(data);
  };

  const findOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await productService.findOne(id);
    res.json(data);
  };

  const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const input = req.body;
    const data = await productService.update(id, input);
    res.json(data);
  };

  const remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await productService.remove(id);
    res.json(data);
  };

  return wrapperGroup({ create, findAll, findOne, update, remove });
};
