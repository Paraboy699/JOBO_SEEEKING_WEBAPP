import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker", isAuthorized, jobseekerGetAllApplications);
router.get("/employer", isAuthorized, employerGetAllApplications);
router.post("/post", isAuthorized, postApplication);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);

export default router;
