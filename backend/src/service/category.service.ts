import { ZodError } from "zod";
import CategoryModel from "../model/category.model";
import { CreateCategoryType, StatusHttpType } from "../utils/types";
import { categorySchema } from "../utils/zod/categoryZod";
import { checkExistsChampionship } from "../utils/validations";

export default class CategoryService {
  private categoryModel = new CategoryModel();

  public createCategory = async (
    obj: CreateCategoryType,
    competitionId: string
  ) => {
    try {
      const parsedData = categorySchema.parse(obj);

      const checkChamp = await checkExistsChampionship(competitionId);
      if (!checkChamp) {
        return {
          status: "NOT_FOUND" as StatusHttpType,
          data: { message: "Championship not found" },
        };
      }

      const result = await this.categoryModel.createCategory(
        parsedData,
        competitionId
      );
      if (!result) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error creating category" },
        };
      }

      return { status: "CREATED" as StatusHttpType, data: result };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          status: "BAD_REQUEST" as StatusHttpType,
          data: { message: error.errors[0].message },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: error as Error,
      };
    }
  };

  public getAllCategoriesByCompetitionId = async (competitionId: string) => {
    if (!competitionId && competitionId === "") {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Competition ID is required" },
      };
    }

    const checkChamp = await checkExistsChampionship(competitionId);
    if (!checkChamp) {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Championship not found" },
      };
    }

    const { data } = await this.categoryModel.getAllCategoriesByCompetitionId(
      competitionId
    );

    if (data.length === 0) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "No categories found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public getCategoryById = async (categoryId: string) => {
    const { data } = await this.categoryModel.getCategoryById(categoryId);
    if (!data) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Category not found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public updateCategoryById = async (
    obj: CreateCategoryType,
    categoryId: string
  ) => {
    try {
      const parsedData = categorySchema.parse(obj);

      const { data } = await this.categoryModel.updateCategoryById(
        parsedData,
        categoryId
      );
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error updating category" },
        };
      }

      return { status: "OK" as StatusHttpType, data };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          status: "BAD_REQUEST" as StatusHttpType,
          data: { message: error.errors[0].message },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: error as Error,
      };
    }
  };

  public deleteCategoryById = async (categoryId: string) => {
    const { data } = await this.categoryModel.deleteCategoryById(categoryId);
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error deleting category" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };
}
