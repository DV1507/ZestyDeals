import { Response } from "express";

interface ApiResponse<T> {
  data?: Object | null;
  message: string;
  toast: boolean;
}

const generalResponse = <T>(
  res: Response,
  statusCode: number,
  data: Object | null,
  message: string,
  toast: boolean = false
): void => {
  const response: ApiResponse<T> = {
    data,
    message,
    toast,
  };

  res.status(statusCode).json(response);
};

export default generalResponse;
