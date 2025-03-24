import { NextFunction, Request, Response } from "express";

export default class AuthMiddlewareExpress {
    handle(input: any) {
        return (req: Request, res: Response, next: NextFunction) => {
            next();
        }
    }
}