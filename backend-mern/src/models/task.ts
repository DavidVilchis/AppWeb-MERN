import { ObjectId } from "mongodb";

export interface TaskId{
    _id: ObjectId,
    email: string,
    title: string,
    description: string,
    type_task: "ToDo" | "In Process" | "Success",
    date_creation: string
}
export interface Task{
    title: string,
    email: string,
    description: string,
    type_task: "ToDo" | "In Process" | "Success",
    date_creation: string
}