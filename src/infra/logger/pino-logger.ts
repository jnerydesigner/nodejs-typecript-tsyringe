import { injectable } from "tsyringe";
import pino, { Logger } from "pino";
import { ILogger } from "./logger.interface";

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: Logger;
  constructor() {
    this.logger = pino({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      },
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
