"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.post("/task", passport_1.default.authenticate("jwt", { session: false }), task_controller_1.task);
router.post("/allTasks", passport_1.default.authenticate("jwt", { session: false }), task_controller_1.allTasks);
router.post("/newTask", passport_1.default.authenticate("jwt", { session: false }), task_controller_1.newTask);
router.post("/updateTask", passport_1.default.authenticate("jwt", { session: false }), task_controller_1.updateTask);
router.post("/deleteTask", passport_1.default.authenticate("jwt", { session: false }), task_controller_1.deleteTask);
exports.default = router;
