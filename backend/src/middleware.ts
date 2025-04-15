
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";



export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]; // just the token string now

    console.log("Received Token:", token); // Debug

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

