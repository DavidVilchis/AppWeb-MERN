import { Request, Response } from "express";
import { TaskId } from "../models/task";
import connection from "../database";
import config from "../config/config";
import { ObjectId } from "mongodb";

export const task = (req: Request, res: Response) => {
    return res.json({ msj: "Solo Uno" });
};
export const allTasks = async (req: Request, res: Response): Promise<Response> => {
    const collection = (await connection).collection("tasks");
    const tasks = await collection.find({email:req.body.email}).toArray();
    return res.status(200).json(tasks);
};

export const newTask = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.title || !req.body.description || !req.body.type_task || !req.body.date_creation) {
        return res.status(400).json({ msj: "La creación de la nueva tarea no se logro realizar, verifique que los datos sean correctos." });
    }
    const collection = (await connection).collection("tasks");
    let newDocument = {
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,
        type_task: req.body.type_task,
        date_creation:req.body.date_creation
    }
    collection.insertOne(newDocument);
    const tasks = await collection.find({email:req.body.email}).toArray();
    return res.status(200).json(tasks);
};

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.id || !req.body.title || !req.body.description || !req.body.type_task || !req.body.date_creation){
        return res.status(400).json({ msj: "La actualización de la tarea no se logro realizar, verifique que los datos sean correctos." });
    }
    const collection = (await connection).collection("tasks");
    const id = new ObjectId(req.body.id);
    await collection.updateOne({_id: id}, {$set:{title: req.body.title, description: req.body.description, type_task: req.body.type_task, date_creation:req.body.date_creation}});
    const tasks = await collection.find({email:req.body.email}).toArray();
    return res.status(200).json(tasks);
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.id){
        return res.status(400).json({ msj: "La eliminación de la tarea no se logro realizar. ID Missing." });
    }
    const collection = (await connection).collection("tasks");
    const id = new ObjectId(req.body.id);
    const result = await collection.deleteOne({_id: id});
    console.log(result);
    const tasks = await collection.find({email:req.body.email}).toArray();
    return res.status(200).json(tasks);
};