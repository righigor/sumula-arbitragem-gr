import { FastifyInstance } from "fastify";
import StaffController from "../controller/staff.controller";

const staffController = new StaffController();

async function staffRoute(fastify: FastifyInstance) {
  fastify.post("/staff/create/:teamId", staffController.createStaff);
  fastify.get("/staff/id/:staffId", staffController.getStaffById);
  fastify.get("/staff/team/:teamId", staffController.getAllStaffByTeamId);
  fastify.put("/staff/:staffId", staffController.updateStaffById);
  fastify.delete("/staff/:staffId", staffController.deleteStaffById);
}

export default staffRoute;
