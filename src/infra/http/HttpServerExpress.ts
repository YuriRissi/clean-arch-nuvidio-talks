

import express, { Express, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import HttpServer, { RouteConfig } from '../../presentation/interfaces/HttpServer';
import AuthMiddlewareExpress from './AuthMiddlewareExpress';
import ErrorMiddlewareExpress from './ErrorMiddlewareExpress';



export default class ExpressAdapter implements HttpServer {
  private readonly app: Express;
  private server: http.Server;

  constructor(
    private readonly authMiddleware: AuthMiddlewareExpress,
    private readonly errorMiddleware: ErrorMiddlewareExpress,
  ) {
    this.app = express();
    this.app.use(express.json());
   
  }

  addRoute(route: RouteConfig): void {
    this.app[route.method](
      '/hooks' + route.url,
      this.authMiddleware.handle(route.auth),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await route.handle(req);
          res.status(output.statusCode).json(output.body);
        } catch (err) {
          next(err);
        }
      }
    );
  }

  listen(port: number): void {
    this.app.use(this.errorMiddleware.handle());
    this.server = this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  shutdown(): void {
    console.log('Shutting down gracefully...');
    this.server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });
  }
}
