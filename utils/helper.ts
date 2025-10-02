import { Request, Response, NextFunction } from "express";

cons

const getTokenFromHeader = async (
  req: Request,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
};


const AuthMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
  const token = await getTokenFromHeader(req)

  if(!token){
    res.status(401).json({
      message:"Access denied!, no token provide",
      redirect:``
    })
  }

}

