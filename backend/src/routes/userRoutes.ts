import { Router } from "express";
import { body } from "express-validator";
import {
  checkEmail,
  checkId,
  checkString,
  validate,
} from "../middleware/validators";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../controllers/userControllers";

const router: Router = Router();

const createUserChains = [
  checkEmail("email"),
  checkString("username"),
  checkString("password"),
  checkString("firstName"),
  checkString("lastName"),
];
const updateUserChains = [
  checkId(),
  checkString("firstName", true),
  checkString("username", true),
  checkString("lastName", true),
  checkString("password", true),
  checkEmail("email", true),
];

router.post("/", validate(createUserChains), createUser);
router.get("/", listUsers);

router.get("/:id", validate(checkId()), getUser);
router.patch("/:id", validate(updateUserChains), updateUser);
router.delete("/:id", validate(checkId()), deleteUser);

export default router;
