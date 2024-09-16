"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDataSource = initializeDataSource;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const isDevelopment = config_1.config.NODE_ENV === "development";
const AppDataSource = new typeorm_1.DataSource({
  type: "postgres",
  host: config_1.config.POSTGRES_HOST,
  port: Number(config_1.config.POSTGRES_PORT) || 5432,
  username: config_1.config.POSTGRES_USER,
  password: config_1.config.POSTGRES_PASSWORD,
  database: config_1.config.POSTGRES_DB,
  synchronize: isDevelopment,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["db/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  ssl: isDevelopment,
  ...(isDevelopment
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
});
async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map
