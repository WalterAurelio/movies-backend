import { Request, Response, NextFunction } from "express";

export const verifyRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.roles) return res.sendStatus(403);
    const userRoles = req.roles;
    const allowedRolesArr = allowedRoles;

    const userIsAllowed = allowedRolesArr.some(role => userRoles.includes(role));
    if (!userIsAllowed) return res.status(403).json({ message: 'No puedes acceder debido a tus roles.' });
    
    next();
  }
};