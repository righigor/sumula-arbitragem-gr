import fastify from "fastify";
import championshipRoute from "./routes/championship.route";
import apparatusRoute from "./routes/apparatus.route";
import teamRoute from "./routes/team.route";
import staffRoute from "./routes/staff.route";

const app = fastify();

app.get("/", async (req, res) => {
  return { hello: "world" };
});

app.register(championshipRoute);
app.register(apparatusRoute);
app.register(teamRoute);
app.register(staffRoute);

app.listen({ port: 3000 }).then(() => {
    console.log("Server is running on http://localhost:3000");
});