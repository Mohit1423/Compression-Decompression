import express from "express";
import {Compress, Decompress} from "../controller/user.controller.js";
import { SingleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/compress",SingleUpload,Compress)
router.post("/decompress",SingleUpload,Decompress)

export default router;
