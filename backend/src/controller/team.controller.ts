import { FastifyReply, FastifyRequest } from "fastify";
import TeamService from "../service/team.service";
import { CreateTeamType } from "../utils/types";
import { mapHTTPStatus } from "../utils/mapHTTPStatus";

export default class TeamController {
  private teamService = new TeamService();

  public createTeam = async (request: FastifyRequest, reply: FastifyReply) => {
    const { championshipId } = request.params as { championshipId: string };
    const obj = request.body as CreateTeamType;
    const { status, data } = await this.teamService.createTeam(obj, championshipId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getTeamById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { teamId } = request.params as { teamId: string };
    const { status, data } = await this.teamService.getTeamById(teamId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getAllTeamsByChampionshipId = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { championshipId } = request.params as { championshipId: string };
    const { status, data } = await this.teamService.getAllTeamsByChampionshipId(
      championshipId
    );

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public updateTeamById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { teamId } = request.params as { teamId: string };
    const obj = request.body as CreateTeamType;
    const { status, data } = await this.teamService.updateTeamById(obj, teamId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public deleteTeamById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { teamId } = request.params as { teamId: string };
    const { status, data } = await this.teamService.deleteTeamById(teamId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };
}
