/// <reference types="express" />

declare global {
  interface AppResponseModel<T = null> {
    status: "success" | "error/failed";
    statusCode?: number;
    message: string;
    data?: T;
    total?: number;
  }

  namespace Express {
    interface Response {
      sendResponse: <T = null>(
        type: "success" | "error/failed",
        /**
         * HTTP Status Code (ex: 200, 201, 404, 500, etc.)
         * @default 200
         * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
         */
        statusCode: number,
        options: Omit<AppResponseModel<T>, "status" | "statusCode">
      ) => void;
    }
  }
}

export {};
