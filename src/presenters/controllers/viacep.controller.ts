import { ViaCepResponseDTO } from "@application/dto/viacep-response.dto";
import { IHttpService } from "@domain/http-service.interface";
import { HttpType } from "@infra/types/http.type";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class ViaCepController {
  constructor(
    @inject(HttpType.FetchService) private readonly httpService: IHttpService
  ) {}
  async getAddressForCep(req: Request, res: Response) {
    const { cep } = req.params;

    const viacep = await this.httpService.get<ViaCepResponseDTO>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    res.json({
      viacep,
    });
  }
}

// https://viacep.com.br/ws/${cep}/json/
