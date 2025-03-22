import express from "express";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

async function startServer() {
  try {
    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // Ensure we wait for Apollo Server to start
    await server.start();
    console.log("🚀 Apollo Server started successfully");

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

    // if we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../../client/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
      });
    }

    // Wait for MongoDB connection
    await new Promise<void>((resolve) => {
      db.once("open", resolve);
    });
    console.log("📦 MongoDB connection established");

    // Start the server
    await new Promise<void>((resolve) => {
      httpServer.listen(PORT, () => {
        console.log(`🌍 Server ready at http://localhost:${PORT}/graphql`);
        resolve();
      });
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
}

startServer();
