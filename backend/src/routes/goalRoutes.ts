import { Router } from "express";
import {
  createGoal,
  deleteGoal,
  getGoal,
  listGoals,
  updateGoal,
} from "../controllers/goalController";
import {
  checkEnum,
  checkId,
  checkInt,
  checkString,
  validate,
} from "../middleware/validators";
import { GoalStatusEnum } from "../models/Goal";

const router: Router = Router();

const createGoalChains = [checkString("title"), checkInt("rank")];
const updateGoalChains = [
  checkId(),
  checkEnum("status", GoalStatusEnum, true),
  checkString("title", true),
  checkInt("rank", true),
];

router.post("/", validate(createGoalChains), createGoal);
router.get("/", listGoals);

router.get("/:id", validate(checkId()), getGoal);
router.patch("/:id", validate(updateGoalChains), updateGoal);
router.delete("/:id", validate(checkId()), deleteGoal);

export default router;
