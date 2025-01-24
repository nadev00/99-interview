import { ProductStatus } from "./product.constant";

export interface IFindAllProductQuery {
  page?: string;
  pageSize?: string;
  search?: string;
  status?: string;
  amountGreaterThan?: string;
  amountLessThan?: string;
}
