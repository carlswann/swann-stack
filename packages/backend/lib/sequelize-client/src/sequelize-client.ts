import { Sequelize } from '@swann-stack/sequelize-typescript';
import { ConnectionError, ConnectionRefusedError, ConnectionTimedOutError, TimeoutError } from '@swann-stack/sequelize';
import * as ModelInitializers from '@swann-stack/sequelize-models';

const useSSL = process.env.DATABASE_USE_SSL?.toLowerCase() === 'true';
const connectionString = process.env.DATABASE_URL;

const sslOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const DBManager = (function () {
  // Instance stores a reference to the Singleton
  let sequelize: Sequelize;
  let isOpen = false;

  function init() {
    return {
      isOpen: () => isOpen,
      open: () => {
        isOpen = true;
        sequelize = new Sequelize(connectionString, {
          dialect: 'postgres',
          logging: false,
          define: {
            underscored: true,
          },
          pool: {
            max: process.env.DATABASE_MAX_CONNECTIONS ? parseInt(process.env.DATABASE_MAX_CONNECTIONS) : 10,
            min: 0,
            idle: 10000,
            acquire: 20000,
            evict: 10000,
          },
          retry: {
            match: [ConnectionError, ConnectionRefusedError, ConnectionTimedOutError, TimeoutError],
            max: 10,
          },
          ...(useSSL && sslOptions),
        });

        sequelize.addModels(Object.values(ModelInitializers));
      },

      getSequelizeClient: () => {
        return sequelize;
      },
    };
  }

  let instance: ReturnType<typeof init>;
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: () => {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
})();

export function SequelizeClient(): Sequelize {
  const dbManager = DBManager.getInstance();

  if (!dbManager.isOpen()) {
    dbManager.open();
  }

  return dbManager.getSequelizeClient();
}
