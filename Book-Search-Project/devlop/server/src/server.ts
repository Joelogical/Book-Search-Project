import express from "express";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";

const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for Apollo Server to start
await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply Apollo middleware
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.authorization }),
  })
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Start the server
db.once("open", () => {
  httpServer.listen(process.env.PORT || 3001, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT || 3001}/graphql`
    );
  });
});
