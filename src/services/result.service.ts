import { prisma } from "../config/prisma";
import { CreateResultInput, UpdateResultInput } from "../types/nidex.type";

export const ResultService = {
  findAllResultService: () => {
    return prisma.result.findMany();
  },


  findResultByIdService: (id: string) => {
    return prisma.result.findUnique({
      where: { id },
    });
  },


  createResultService: (data: CreateResultInput) => {
    return prisma.result.create({
      data: {
        manageBy: data.manageBy,
        items: data.items,
      },
    });
  },


  updateResultService: (id: string, data: UpdateResultInput) => {
    return prisma.result.update({
      where: { id },
      data: {
        ...(data.manageBy && { manageBy: data.manageBy }),
        ...(data.items && { items: data.items }),
      },
    });
  },


  deleteResultService: (id: string) => {
    return prisma.result.delete({
      where: { id },
    });
  },

  deleteOldResultsService: async () => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const deleteResult = await prisma.result.deleteMany({
      where: {
        createdAt: {
          lt: ninetyDaysAgo,
        },
      },
    });
    return deleteResult;
  },
};