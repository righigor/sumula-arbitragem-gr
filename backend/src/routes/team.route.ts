import { FastifyInstance } from "fastify";
import TeamController from "../controller/team.controller";

const teamController = new TeamController();

async function teamRoute(fastify: FastifyInstance) {
  fastify.post("/team/create/:championshipId", teamController.createTeam);
  fastify.get("/team/id/:teamId", teamController.getTeamById);
  fastify.get("/team/championship/:championshipId", teamController.getAllTeamsByChampionshipId);
  fastify.put("/team/:teamId", teamController.updateTeamById);
  fastify.delete("/team/:teamId", teamController.deleteTeamById);
}

export default teamRoute;