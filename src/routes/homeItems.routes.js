import { Router } from "express";
import { addHomeItems } from "../controllers/Pages/HomePage/AddHomeItems.controller";

const router = Router();

router.route("/").post(addHomeItems);
router.route("/").put(editHomePage);

export default router;
