import {
  PORT,
  SESSION_SECRET,
  CORS_ORIGIN,
  __DEV__,
  COOKIE_NAME,
} from '@/constants';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

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

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000, // 5 years
        httpOnly: true,
        sameSite: 'none',
        secure: !__DEV__,
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    }),
  );

  app.use(
    cors({
      origin: [CORS_ORIGIN],
      credentials: true,
    }),
  );

  apolloServer.applyMiddleware({ app, cors: false });

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, () => resolve(null)),
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
  );
};
