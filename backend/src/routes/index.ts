import { Router } from "express";
import goalRoutes from "./goalRoutes";
import userRoutes from "./userRoutes";

const router: Router = Router();

router.use("/goals", goalRoutes);
router.use("/users", userRoutes);

export default router;
