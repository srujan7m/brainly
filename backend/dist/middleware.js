"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// const JWT_PASSWORD = "hi"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_PASSWORD = "hi";
const userMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]; // just the token string now
    console.log("Received Token:", token); // Debug
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.userMiddleware = userMiddleware;
