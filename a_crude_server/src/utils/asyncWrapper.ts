import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptionFilter/http.exception";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncWrapper = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      if (error instanceof HttpException) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
        return;
      }

      console.error("Unhandled Error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    });
  };
};

export const wrapperGroup = (data: Record<string, AsyncController>) => {
  return Object.entries(data).reduce((prev, [key, value]) => {
    prev[key] = asyncWrapper(value);

    return prev;
  }, {} as Record<string, any>);
};
