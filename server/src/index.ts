import { config } from 'dotenv';
config();

import 'reflect-metadata';
import 'module-alias/register';
import startApolloServer from '@/app';
import { createConnection } from 'typeorm';
import { User } from '@/entities/User';
import { UserResolver } from '@/resolvers/User';

const main = async () => {
  await createConnection({
    synchronize: true,
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [User],
  });

  await startApolloServer([UserResolver]);
};

main();
