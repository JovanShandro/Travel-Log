import {
  COOKIE_NAME,
  CORS_ORIGIN,
  PORT,
  SESSION_SECRET,
  __DEV__,
} from '@/constants';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import http from 'http';
import redis from 'redis';
import { buildSchema, NonEmptyArray } from 'type-graphql';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient(process.env.REDIS_URL as string);

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
        sameSite: 'lax',
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
