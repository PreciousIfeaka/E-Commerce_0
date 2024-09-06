import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";

const isDevelopment = config.NODE_ENV === "development";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT) || 5432,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
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

export async function initializeDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export default AppDataSource;