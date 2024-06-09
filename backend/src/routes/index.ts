import { Router } from "express";
import habitRoutes from "./habitRoutes";

const router: Router = Router();

router.use("/habits", habitRoutes);

export default router;
