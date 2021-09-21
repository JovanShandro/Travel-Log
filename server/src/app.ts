import { PORT } from '@/constants';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema, NonEmptyArray } from 'type-graphql';

export default async (
  resolvers: NonEmptyArray<any> | NonEmptyArray<string>,
): Promise<void> => {
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [...resolvers],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    }),
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, () => resolve(null)),
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
  );
};
