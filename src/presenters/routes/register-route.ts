import { getBodyParam } from "@infra/decorators/body.decorator";
import { CONTROLLERS } from "@infra/decorators/controller.decorator";
import { ROUTES_KEY } from "@infra/decorators/methods.decorator";
import { getRouteParam } from "@infra/decorators/param.decorator";
import { getQueryParam } from "@infra/decorators/query.decorator";
import express, { Request, Response } from "express";

import { container } from "tsyringe";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type RouteDefinition = {
  method: HttpMethod;
  path: string;
  controllerName: string;
};

export function registerRoutes(app: express.Express) {
  CONTROLLERS.forEach(({ target, prefix }) => {
    const controller = container.resolve(target) as Record<
      string,
      (...args: any[]) => any
    >;

    const routes = Reflect.getMetadata(ROUTES_KEY, target) || [];

    (routes as RouteDefinition[]).forEach((route) => {
      const expressMethod = route.method as keyof express.Express;

      (
        app[expressMethod] as unknown as (
          path: string,
          handler: express.RequestHandler
        ) => void
      )(`${prefix}${route.path}`, async (req: Request, res: Response) => {
        try {
          const handler = controller[route.controllerName].bind(controller);
          const args: any[] = [];

          const paramMetadata = getRouteParam(controller, route.controllerName);
          paramMetadata.forEach(({ index, name }) => {
            args[index] = req.params[name];
          });

          const bodyIndex = getBodyParam(controller, route.controllerName);
          if (bodyIndex !== undefined) args[bodyIndex] = req.body;

          const queryIndex = getQueryParam(controller, route.controllerName);
          if (queryIndex !== undefined) args[queryIndex] = req.query;

          const result = await handler(...args);

          res.json(result);
        } catch (error) {
          res.status(500).json({
            messageError: `Erro interno ${JSON.stringify(error)}`,
          });
        }
      });
    });
  });
}
