import { Router } from "express";
import passport from "passport";
import { task, allTasks, newTask, updateTask, deleteTask } from "../controllers/task.controller";


const router = Router();

router.post("/task", passport.authenticate("jwt", {session: false}), task);
router.post("/allTasks", passport.authenticate("jwt", {session: false}), allTasks);
router.post("/newTask", passport.authenticate("jwt", {session: false}), newTask);
router.post("/updateTask", passport.authenticate("jwt", {session: false}), updateTask);
router.post("/deleteTask", passport.authenticate("jwt", {session: false}), deleteTask);

export default router;