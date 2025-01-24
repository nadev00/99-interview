import { InsertExpression } from "kysely/dist/cjs/parser/insert-values-parser";
import { db } from "../../database/database.config";
import { DB, Product } from "../../database/database.type";
import { HttpException } from "../../exceptionFilter/http.exception";
import { IFindAllProductQuery } from "./product.interface";

export const ProductService = () => {
  const create = async (dto: Product) => {
    try {
      const productExists = await db
        .selectFrom("product")
        .where("name", "=", dto.name)
        .executeTakeFirst();

      if (productExists) {
        throw new HttpException("Product's name already exists", 409);
      }

      const dataInput: InsertExpression<DB, "product"> = {
        amount: dto.amount,
        description: dto.description,
        image: dto.image,
        name: dto.name,
      };

      if (dto.status) {
        dataInput.status = dto.status as any;
      }

      await db.insertInto("product").values(dataInput).executeTakeFirst();

      return {
        inserted: true,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException("Internal Server Error", 500);
    }
  };

  const findAll = async (input: IFindAllProductQuery) => {
    const page = input?.page ? Number(input.page) : 1;
    const pageSize = input?.pageSize ? Number(input.pageSize) : 10;
    const offset = (page - 1) * pageSize;
    let query = db.selectFrom("product");

    if (input.search) {
      const rhs = `%${input.search}%`;
      query = query.where((qb) =>
        qb.or([
          qb('name', 'like', rhs),
          qb('description', 'like', rhs)
        ])
      );
    }

    if (input.status) {
      query = query.where("status", "=", input.status);
    }

    if (input.amountGreaterThan) {
      query = query.where("amount", ">=", +input.amountGreaterThan);
    }

    if (input.amountLessThan) {
      query = query.where("amount", "<=", +input.amountLessThan);
    }

    const data = await query
      .selectAll()
      .limit(pageSize)
      .offset(offset)
      .execute();
    const totalCount = await query
      .select(({ fn }) => fn.countAll().as("count"))
      .executeTakeFirst();

    return {
      data,
      total: Number(totalCount?.count),
      page,
      pageSize,
    };
  };

  const findOne = async (id: string) => {
    const product = await db
      .selectFrom("product")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!product) {
      throw new HttpException("Product not found", 404);
    }

    return product;
  };

  const update = async (id: string, input: Product) => {
    const product = await findOne(id);

    if (input.name && input.name !== product.name) {
      const productExist = await db
        .selectFrom("product")
        .select("id")
        .where("id", "!=", id)
        .where("name", "=", input.name)
        .executeTakeFirst();

      if (productExist) {
        throw new HttpException("Product's name already exists", 409);
      }
    }

    await db
      .updateTable("product")
      .where("id", "=", id)
      .set({
        amount: input.amount ?? product.amount,
        image: input.image ?? product.image,
        description: input.description ?? product.description,
        name: product.name ?? product.name,
        status: (input.status ?? product.status) as any,
      })
      .executeTakeFirst();

    return {
      updated: true,
    };
  };

  const remove = async (id: string) => {
    await findOne(id);

    await db.deleteFrom("product").where("id", "=", id).execute();

    return {
      deleted: true,
    };
  };

  return { create, findAll, findOne, update, remove };
};
