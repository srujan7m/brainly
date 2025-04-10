import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import { JWT_PASSWORD } from "./config";
const app  = express();
app.use(express.json());

import cors from "cors"
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.post("/api/v1/signup", async (req, res) => {
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
   
        console.log("Request Body:", req.body);  // ✅ Log request data
    
        const username = req.body.username;
        const password = req.body.password;
    
        try {
            const user = await UserModel.create({ username, password });
    
            console.log("User Created:", user);  // ✅ Log created user
    
            res.json({ message: "User signed up" });
        } catch (e) {
            console.error("Signup Error:", e);  // ✅ Log exact error
    
            res.status(409).json({ message: "User already exists" });
        }
   
    
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

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
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    console.log("Received Content Data:", req.body);  // ✅ Log request body
    console.log("User ID from Middleware:", req.userId);  // ✅ Log userId

    try { 
        const content = await ContentModel.create({
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            userId: req.userId,  // ✅ Ensure userId is correctly attached
            tags: []
        });

        console.log("Content Created:", content);  // ✅ Log created content
        res.json({ message: "Content added" });
    } catch (e) {
        console.error("Error adding content:", e);  // ✅ Log exact error

        res.status(500).json({ message: "Error adding content" });
    } 
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const { title } = req.body;
    try {
        const content = await ContentModel.findOne({ title });
        if (!content) {
            res.status(404).json({ message: 'Content not found' });
            return;
        }
        const contentId = content._id;
        const userId = content.userId;

        const deleteContent = await ContentModel.deleteOne({
            _id: contentId,
            userId
        });

        if (deleteContent.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({ message: "Error occurred" });
    }
    return; // Ensure the function always returns
});

app.post("/api/v1/brain/share" ,userMiddleware,async (req,res)=>{
    const share =  req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return
        }
        const hash = random(10)
        await LinkModel.create({
            userId: req.userId,
            hash:hash
        })
        res.json({
            message: "/share/" + hash
        })

        
        
    }else{
        await LinkModel.deleteOne({
          userId : req.userId  
        })
    }

    res.json({
        message:"Updated sharable link"
    })
})
app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    const { shareLink } = req.params;

    const link = await LinkModel.findOne({ hash: shareLink });
    
    if(!link){
        res.json(404).json({
            message:"Sorry Incorrect Link"
        })
        return;
    }
    const content = await ContentModel.find({
        userId :link.userId
    })
    const user = await UserModel.findById(link.userId);
    res.json({
        username:user?.username,
        content : content
    })
})

app.listen(3000);