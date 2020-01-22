/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { Server } from 'hapi';
import { chartPlugin } from './services/chart';
import { APP_CONSTANT } from '../src/app/app.constant';
const CatboxMemory = require('@hapi/catbox-memory');
const init = async () => {
  const server = new Server({
    port: 3333,
    host: APP_CONSTANT.HOST,
    routes: {
      cors: true
    },
    cache: {
      name: APP_CONSTANT.CACHE_SERVER_NAME,
      provider: {
        constructor: CatboxMemory,
        options: {
          partition: APP_CONSTANT.CACHE_PARTITION
        }
      }
    }
  });
  await server.register(
    { plugin: chartPlugin },
    {
      routes: {
        prefix: APP_CONSTANT.API_PREFIX
      }
    }
  );
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
init();
