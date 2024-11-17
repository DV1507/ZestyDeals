import { JWT_SECRET } from "../../config";
import generalResponse from "../../utlis/generalResponse";
import jwt from "jsonwebtoken";
export async function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, JWT_SECRET || "random123");

    // @ts-ignore
    req?.id = payload?.id;
    next();
  } catch (error) {
    return generalResponse(res, 403, {}, "Unauthorized", true);
  }
}
