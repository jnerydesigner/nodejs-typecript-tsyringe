import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { Router } from "express";
import { container } from "tsyringe";
import "@infra/containers";

const viaCepRoutes = Router();

const viacepController = container.resolve(ViaCepController);

viaCepRoutes.get(
  "/:cep",
  viacepController.getAddressForCep.bind(viacepController)
);

export { viaCepRoutes };
