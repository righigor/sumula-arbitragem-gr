import { FastifyInstance } from "fastify";
import CategoryController from "../controller/category.controller";

const categoryController = new CategoryController();

async function categoryRoute(fastify: FastifyInstance) {
  fastify.post(
    "/category/create/:competitionId",
    categoryController.createCategory
  );
  fastify.get(
    "/category/competition/:competitionId",
    categoryController.getAllCategoriesByCompetitionId
  );
  fastify.get("/category/id/:categoryId", categoryController.getCategoryById);
  fastify.put("/category/:categoryId", categoryController.updateCategoryById);
  fastify.delete(
    "/category/:categoryId",
    categoryController.deleteCategoryById
  );
}

export default categoryRoute;
