import express from "express";
import {Compress} from "../controller/user.controller.js";
import { SingleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/compress",SingleUpload,Compress)

export default router;
