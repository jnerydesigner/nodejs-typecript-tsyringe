import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { IHttpService } from "@domain/http-service.interface";
import { ILogger } from "@infra/logger/logger.interface";

import { PinoLogger } from "@infra/logger/pino-logger";
import { HttpTypes } from "@infra/types/http.type";
import { LoggerTypes } from "@infra/types/logger.type";
import { ViaCepTypes } from "@infra/types/viacep.type";
import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { container } from "tsyringe";

container.register(ViaCepTypes.ViaCepController, {
  useClass: ViaCepController,
});

container.register<IHttpService>(HttpTypes.AxiosService, {
  useClass: AxiosService,
});

container.register<IHttpService>(HttpTypes.FetchService, {
  useClass: FetchService,
});

container.register<ILogger>(LoggerTypes.Logger, {
  useClass: PinoLogger,
});
