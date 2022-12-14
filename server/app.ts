import express from "express";
import fs from "fs";
import resolvers from "./graphql/resolvers";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";
import { Resolvers } from "./generated/graphql";

const typeDefs = fs.readFileSync("./graphql/schema.graphql", "utf-8");

async function startApolloServer(typeDefs: string, resolvers: Resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(3001, () => {
    console.log("Server is listening to port 3001");
  });
}

startApolloServer(typeDefs, resolvers);
