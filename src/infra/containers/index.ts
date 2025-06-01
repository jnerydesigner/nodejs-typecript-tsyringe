import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { IHttpService } from "@domain/http-service.interface";
import { HttpType } from "@infra/types/http.type";
import { ViaCepType } from "@infra/types/viacep.type";
import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { container } from "tsyringe";

container.register<IHttpService>(HttpType.AxiosService, {
  useClass: AxiosService,
});

container.register<IHttpService>(HttpType.FetchService, {
  useClass: FetchService,
});

container.register(ViaCepType.ViaCepController, {
  useClass: ViaCepController,
});
