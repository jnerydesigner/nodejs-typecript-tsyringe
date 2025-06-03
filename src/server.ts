import "dotenv/config";
import "reflect-metadata";
import { logger } from "@infra/logger/logger.log";

import { viaCepRoutes } from "@presenters/routes/viacep.route";
import express, { Request, Response } from "express";
import { viacepModule } from "@infra/modules/viacep.module";
import { registerRoutes } from "@presenters/routes/register-route";

const PORT = process.env.SERVER_PORT || 3333;

async function bootstrap() {
  const app = express();
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Hello Word",
    });
  });
  viacepModule();

  registerRoutes(app);

  app.use("/viacep", viaCepRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Route Not Found",
      method: req.method,
      path: req.originalUrl,
    });
  });

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

bootstrap();
