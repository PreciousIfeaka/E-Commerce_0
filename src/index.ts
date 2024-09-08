import app from "./app";
import { config } from "./config";
import AppDataSource from "./data-source";
import log from "./utils/logger";

const port = config.PORT;
AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    log.info(`Server is listening on port ${port}`);
  });
});
