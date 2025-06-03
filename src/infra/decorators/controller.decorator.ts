import { logger } from "@infra/logger/logger.log";

export const CONTROLLERS: any[] = [];

export function Controller(prefix: string = "") {
  return (target: any) => {
    CONTROLLERS.push({ target, prefix });
    CONTROLLERS.map((c) => logger.info(c));
  };
}
