import { prisma } from "../lib/prisma";
import { CreateCategoryType } from "../utils/types";

export default class CategoryModel {
  public createCategory = async (
    { name, level }: CreateCategoryType,
    competitionId: string
  ) => {
    const result = await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        level,
        competitionId,
      },
    });

    return { data: result };
  };

  public getAllCategoriesByCompetitionId = async (competitionId: string) => {
    const result = await prisma.category.findMany({
      where: {
        competitionId,
      },
    });

    return { data: result };
  };

  public getCategoryById = async (categoryId: string) => {
    const result = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return { data: result };
  };

  public updateCategoryById = async (
    { name, level }: CreateCategoryType,
    categoryId: string
  ) => {
    const result = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name.toLowerCase(),
        level,
      },
    });

    return { data: result };
  };

  public deleteCategoryById = async (categoryId: string) => {
    const result = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return { data: result };
  };
}
