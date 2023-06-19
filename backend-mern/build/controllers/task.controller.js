"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.newTask = exports.allTasks = exports.task = void 0;
const database_1 = __importDefault(require("../database"));
const mongodb_1 = require("mongodb");
const task = (req, res) => {
    return res.json({ msj: "Solo Uno" });
};
exports.task = task;
const allTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = (yield database_1.default).collection("tasks");
    const tasks = yield collection.find({ email: req.body.email }).toArray();
    return res.status(200).json(tasks);
});
exports.allTasks = allTasks;
const newTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.title || !req.body.description || !req.body.type_task || !req.body.date_creation) {
        return res.status(400).json({ msj: "La creación de la nueva tarea no se logro realizar, verifique que los datos sean correctos." });
    }
    const collection = (yield database_1.default).collection("tasks");
    let newDocument = {
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,
        type_task: req.body.type_task,
        date_creation: req.body.date_creation
    };
    collection.insertOne(newDocument);
    const tasks = yield collection.find({ email: req.body.email }).toArray();
    return res.status(200).json(tasks);
});
exports.newTask = newTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id || !req.body.title || !req.body.description || !req.body.type_task || !req.body.date_creation) {
        return res.status(400).json({ msj: "La actualización de la tarea no se logro realizar, verifique que los datos sean correctos." });
    }
    const collection = (yield database_1.default).collection("tasks");
    const id = new mongodb_1.ObjectId(req.body.id);
    yield collection.updateOne({ _id: id }, { $set: { title: req.body.title, description: req.body.description, type_task: req.body.type_task, date_creation: req.body.date_creation } });
    const tasks = yield collection.find({ email: req.body.email }).toArray();
    return res.status(200).json(tasks);
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id) {
        return res.status(400).json({ msj: "La eliminación de la tarea no se logro realizar. ID Missing." });
    }
    const collection = (yield database_1.default).collection("tasks");
    const id = new mongodb_1.ObjectId(req.body.id);
    const result = yield collection.deleteOne({ _id: id });
    console.log(result);
    const tasks = yield collection.find({ email: req.body.email }).toArray();
    return res.status(200).json(tasks);
});
exports.deleteTask = deleteTask;
