import { config } from 'dotenv';
config();

import 'module-alias/register';
import app from '@/app';
import { PORT } from '@/constants';
import { createConnection } from 'typeorm';
import { User } from '@/entities/User';

const main = async () => {
  await createConnection({
    synchronize: true,
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [User],
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

main();
