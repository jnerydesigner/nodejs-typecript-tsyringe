import { Param } from "./../../infra/decorators/param.decorator";
import { IHttpService } from "@domain/http-service.interface";
import { Body } from "@infra/decorators/body.decorator";
import { Controller } from "@infra/decorators/controller.decorator";
import { Get, Post } from "@infra/decorators/methods.decorator";
import { ILogger } from "@infra/logger/logger.interface";
import { HttpTypes } from "@infra/types/http.type";
import { LoggerTypes } from "@infra/types/logger.type";

import { inject, injectable } from "tsyringe";

@injectable()
@Controller("/viacep")
export class ViaCepController {
  constructor(
    @inject(HttpTypes.AxiosService) private readonly httpService: IHttpService,
    @inject(LoggerTypes.Logger) private readonly logger: ILogger
  ) {}

  @Post("")
  createUser(@Body() body: { name: string }) {
    return body;
  }

  @Get("/:cep")
  async getAddressForCep(@Param("cep") cep: string) {
    const viacep = await this.httpService.get(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    this.logger.info(viacep);

    return viacep;
  }
}

// https://viacep.com.br/ws/${cep}/json/
