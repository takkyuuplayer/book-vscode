import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import * as resolvers from "./resolver";
import { Repository } from "../model/task/repository";

export interface IConfig {
  ListenHost: string;
  WebRoot: string;
}

export class API {
  private express: express.Express;
  private server: ApolloServer;
  private conf: IConfig;

  constructor(conf: IConfig) {
    this.conf = conf;
    this.express = express();

    const typeDefs = readFileSync(
      resolve(__dirname, "../../schema.graphql"),
      "UTF-8"
    );
    this.server = new ApolloServer({
      typeDefs,
      resolvers: resolvers as any,
      context: async () => {
        return { repository: new Repository() };
      }
    });
    this.server.applyMiddleware({ app: this.express });

    this.routing();
  }

  private routing() {
    this.express.use("/", express.static(this.conf.WebRoot));
  }

  public Run() {
    this.express.listen(this.conf.ListenHost, () => {
      console.log(
        `🚀 Server ready at http://localhost:${this.conf.ListenHost}
        ${this.server.graphqlPath}`
      );
    });
  }
}
