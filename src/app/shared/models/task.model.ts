import { TaskItem } from "./task-item.model";

export class Task {
  id: number;
  title: string;
  createdAt: Date;
  finishedAt: Date;
  isCompleted: boolean;
  taskItems: TaskItem[];

  constructor(title: string) {
    this.id = new Date().getTime();
    this.title = title;
    this.createdAt = new Date();
    this.isCompleted = false;
    this.taskItems = []
  }
}
