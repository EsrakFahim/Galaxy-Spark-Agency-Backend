import { Router } from "express";
import { getAllAgencyStats } from "../controllers/AgencyStats/GetAllAgencyStats.controller";
import { getSingleAgencyStats } from "../controllers/AgencyStats/GetSingleAgencyStats.controller";
import { deleteAgencyStats } from "../controllers/AgencyStats/DeleteAgencyStats.controllers";
import { updateAgencyStats } from "../controllers/AgencyStats/EditAgencyStats.controller";
import { addAgencyStats } from "../controllers/AgencyStats/AddAgencyStats.controller";

const router = Router();

router.route("/").get(getAllAgencyStats);
router.route("/:id").get(getSingleAgencyStats);
router.route("/:id").delete(deleteAgencyStats);
router.route("/:id").put(updateAgencyStats);
router.route("/add").post(addAgencyStats);

export default router;
