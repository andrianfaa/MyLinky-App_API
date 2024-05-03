import { type NextFunction, type Request, type Response } from "express";

type SendResponseParams = Parameters<Express.Response["sendResponse"]>;

/**
 * Send Response Middleware
 *
 * @param _req {Request} Express Request Object
 * @param res {Response} Express Response Object
 * @param next {NextFunction} Express Next Function
 */
export default () => (_req: Request, res: Response, next: NextFunction) => {
  res.sendResponse = <T = null>(
    type: "success" | "error/failed",
    statusCode: SendResponseParams[1],
    options: SendResponseParams[2]
  ) => {
    const { message, data } = options;

    return res
      .status(statusCode)
      .json({
        status: type,
        statusCode,
        message,
        data,
        total: options?.total || (Array.isArray(data) ? data.length : undefined)
      })
      .end();
  };

  next();
};
