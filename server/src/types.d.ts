declare module "bcrypt";
declare module "cors";
declare module "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: unknown;
        username: string;
        email: string;
      };
    }
  }
}

export {};
