import { Router } from "express";
import { createHabit, getHabit } from "../controllers/habitController";

const router: Router = Router();

router.post("/", createHabit);
router.get("/:id", getHabit);

export default router;
