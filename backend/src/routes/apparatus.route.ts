import { FastifyInstance } from "fastify";
import ApparatusController from "../controller/apparatus.controller";

const apparatusController = new ApparatusController();

async function apparatusRoute(fastify: FastifyInstance) {
  fastify.post("/apparatus", apparatusController.createApparatus);
  fastify.get(
    "/apparatus/competition/:competitionId",
    apparatusController.getAllApparatusByCompetitionId
  );
  fastify.get(
    "/apparatus/id/:apparatusId",
    apparatusController.getApparatusById
  );
  fastify.put("/apparatus/:apparatusId", apparatusController.updateApparatusById);
  fastify.delete(
    "/apparatus/:apparatusId",
    apparatusController.deleteApparatusById
  );
}

export default apparatusRoute;
