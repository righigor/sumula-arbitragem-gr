import { FastifyRequest, FastifyReply } from "fastify";
import CategoryService from "../service/category.service";
import { mapHTTPStatus } from "../utils/mapHTTPStatus";
import { CreateCategoryType } from "../utils/types";

export default class CategoryController {
  private categoryService = new CategoryService();

  public createCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    const { competitionId } = request.params as { competitionId: string };
    const obj = request.body as CreateCategoryType;
    const { status, data } = await this.categoryService.createCategory(obj, competitionId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getAllCategoriesByCompetitionId = async (request: FastifyRequest, reply: FastifyReply) => {
    const { competitionId } = request.params as { competitionId: string };
    const { status, data } = await this.categoryService.getAllCategoriesByCompetitionId(competitionId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getCategoryById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { categoryId } = request.params as { categoryId: string };
    const { status, data } = await this.categoryService.getCategoryById(categoryId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public updateCategoryById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { categoryId } = request.params as { categoryId: string };
    const obj = request.body as CreateCategoryType;
    const { status, data } = await this.categoryService.updateCategoryById(obj, categoryId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public deleteCategoryById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { categoryId } = request.params as { categoryId: string };
    const { status, data } = await this.categoryService.deleteCategoryById(categoryId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };
}