import fastify from "fastify";
import championshipRoute from "./routes/championship.route";

const app = fastify();

app.get("/", async (req, res) => {
  return { hello: "world" };
});

app.register(championshipRoute);

app.listen({ port: 3000 }).then(() => {
    console.log("Server is running on http://localhost:3000");
});