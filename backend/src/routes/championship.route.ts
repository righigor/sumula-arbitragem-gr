import { FastifyInstance } from "fastify";
import ChampionshipController from "../controller/championship.controller";

const championshipController = new ChampionshipController();

async function championshipRoute(fastify: FastifyInstance) {
    fastify.get('/championship', championshipController.getAllChampionships);
    fastify.post('/championship', championshipController.createChampionship);
}

export default championshipRoute;