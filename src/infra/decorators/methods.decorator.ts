import { HttpMethod } from "@presenters/routes/register-route";

export const ROUTES_KEY = "custom:routes";

export const createRouteDecorator = (method: HttpMethod) => {
  return (path: string) => {
    return (target: any, propertyKey: any) => {
      const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
      routes.push({ method, path, controllerName: propertyKey });
      Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
    };
  };
};

export const Get = createRouteDecorator("get");
export const Post = createRouteDecorator("post");
export const Put = createRouteDecorator("put");
export const Patch = createRouteDecorator("patch");
export const Delete = createRouteDecorator("delete");
