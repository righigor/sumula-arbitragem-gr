import { z } from "zod";
import ChampionshipModel  from "../model/championship.model";
import { CreateChampionshipType } from "../utils/types";
import { CreateChampionshipSchema } from "../utils/zod/championshipZod";

export default class ChampionshipService {
    private championshipModel = new ChampionshipModel();

    public createChampionship = async (obj: CreateChampionshipType) => {
        try {
            const objParsed = CreateChampionshipSchema.parse(obj);
            const { data } = this.championshipModel.createChampionship(objParsed);

            if (!data) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao criar o campeonato' } }
            }

            return { status: 'CREATED', data }
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return { status: 'BAD_REQUEST', data: { message: error.errors[0].message } }
            }
            return { status: 'BAD_REQUEST' , data: error.message }
        }
    }

    public getAllChampionships = async () => {
        const { data } = await this.championshipModel.getAllChampionships();

        if (data.length === 0) {
            return { status: 'NOT_FOUND', data: { message: 'Nenhum campeonato encontrado.' } }
        }

        return { status: 'OK', data }
    }

    
}