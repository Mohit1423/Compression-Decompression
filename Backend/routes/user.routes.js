import express from "express";
import {Compress, Decompress, Login, SignUp} from "../controller/user.controller.js";
import { SingleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/compress",SingleUpload,Compress)
router.post("/decompress",SingleUpload,Decompress)
router.post("/signup",SignUp)
router.post("/login",Login)

export default router;
