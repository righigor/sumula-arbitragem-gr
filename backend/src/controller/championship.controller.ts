import { FastifyReply, FastifyRequest } from "fastify";
import ChampionshipService from "../service/championship.service";
import { mapHTTPStatus } from "../utils/mapHTTPStatus";
import { CreateChampionshipType } from "../utils/types";

export default class ChampionshipController {
    private championshipService = new ChampionshipService();

    public createChampionship = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const obj = request.body as CreateChampionshipType;
            const { status, data } = await this.championshipService.createChampionship(obj);

            return reply.status(mapHTTPStatus(status)).send(data);
        } catch (error: any) {
            return reply.status(500).send({ message: error.message });
        }
    }

    public getAllChampionships = async (request: FastifyRequest, reply: FastifyReply) => {
        const { status, data } = await this.championshipService.getAllChampionships();

        return reply.status(mapHTTPStatus(status)).send(data);
    }
}