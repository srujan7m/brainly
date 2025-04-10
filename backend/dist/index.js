"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_PASSWORD = "hi";
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: zod validation , hash the password
    // const username = req.body.username;
    // const password = req.body.password;
    // try {
    //     await UserModel.create({
    //         username: username,
    //         password: password
    //     }) 
    //     res.json({
    //         message: "User signed up"
    //     })
    // } catch(e) {
    //     res.status(409).json({
    //         message: "User already exists"
    //     })
    // }
    console.log("Request Body:", req.body); // ✅ Log request data
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield db_1.UserModel.create({ username, password });
        console.log("User Created:", user); // ✅ Log created user
        res.json({ message: "User signed up" });
    }
    catch (e) {
        console.error("Signup Error:", e); // ✅ Log exact error
        res.status(409).json({ message: "User already exists" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
// app.post("/api/v1/content", userMiddleware, async (req, res) => {
//     const link = req.body.link;
//     const type = req.body.type;
//    try{ 
//     await ContentModel.create({
//         link,
//         type,
//         title: req.body.title,
//         userId: req.userId,
//         tags: []
//     });
//     res.json({
//         message: "Content added"
//     })
// }catch(e){
//         res.status(500).json({
//             message: "Error adding content"
//         })
//     } 
// })
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Content Data:", req.body); // ✅ Log request body
    console.log("User ID from Middleware:", req.userId); // ✅ Log userId
    try {
        const content = yield db_1.ContentModel.create({
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            userId: req.userId, // ✅ Ensure userId is correctly attached
            tags: []
        });
        console.log("Content Created:", content); // ✅ Log created content
        res.json({ message: "Content added" });
    }
    catch (e) {
        console.error("Error adding content:", e); // ✅ Log exact error
        res.status(500).json({ message: "Error adding content" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const content = yield db_1.ContentModel.findOne({ title });
        if (!content) {
            res.status(404).json({ message: 'Content not found' });
            return;
        }
        const contentId = content._id;
        const userId = content.userId;
        const deleteContent = yield db_1.ContentModel.deleteOne({
            _id: contentId,
            userId
        });
        if (deleteContent.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ message: "Error occurred" });
    }
    return; // Ensure the function always returns
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: "/share/" + hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
    }
    res.json({
        message: "Updated sharable link"
    });
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink } = req.params;
    const link = yield db_1.LinkModel.findOne({ hash: shareLink });
    if (!link) {
        res.json(404).json({
            message: "Sorry Incorrect Link"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findById(link.userId);
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(3000);
