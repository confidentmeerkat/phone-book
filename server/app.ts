import express from "express";
import testModel from "./models/Test";
import fs from "fs";
import resolvers from "./graphql/resolvers";
import {ApolloServer} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer,ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core"
import http from "http";
import { Resolvers } from "./generated/graphql";


const typeDefs = fs.readFileSync("./graphql/schema.graphql", 'utf-8');

export interface Context {

}

async function startApolloServer(typeDefs: string, resolvers: Resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    await server.start();
    server.applyMiddleware({ app });


    app.get("/api/test", async (_, res) => {
        const test = await testModel.create({text: "abced"})

        res.json(test);
    })


    app.listen(3001, () => {
    console.log("Server is listening to port 3001")
    })

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

  startApolloServer(typeDefs, resolvers);
  

