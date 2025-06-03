import { Router } from "express";

import "@infra/containers";
import { container } from "tsyringe";
import { ViaCepController } from "@presenters/controllers/viacep.controller";

const viaCepRoutes = Router();

const viacepController = container.resolve(ViaCepController);

viaCepRoutes.get(
  "/:cep",
  viacepController.getAddressForCep.bind(viacepController)
);

export { viaCepRoutes };
