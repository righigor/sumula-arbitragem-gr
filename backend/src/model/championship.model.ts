import { prisma } from "../lib/prisma";
import { CreateChampionshipType } from "../utils/types";

export default class ChampionshipModel {
    public createChampionship({
        name,
        description,
        startDate,
        endDate,
        city,
        state,
        country,
        address,
        owner
    }: CreateChampionshipType) {
        const result = prisma.championship.create({
            data: {
                name,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                city,
                state,
                country,
                address,
                owner
            }
        });

        return { data: result }
    }

    public async getAllChampionships() {
        const result = await prisma.championship.findMany();

        return { data: result }
    }

    public async getChampionshipById(id: string) {
        const result = await prisma.championship.findUnique({
            where: {
                id
            }
        });

        return { data: result }
    }

    public async updateChampionship(id: string, {
        name,
        description,
        startDate,
        endDate,
        city,
        state,
        country,
        address,
        owner
    }: CreateChampionshipType) {
        const result = await prisma.championship.update({
            where: {
                id
            },
            data: {
                name,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                city,
                state,
                country,
                address,
                owner
            }
        });

        return { data: result }
    }

    public async deleteChampionship(id: string) {
        const result = await prisma.championship.delete({
            where: {
                id
            }
        });

        return { data: result }
    }
}