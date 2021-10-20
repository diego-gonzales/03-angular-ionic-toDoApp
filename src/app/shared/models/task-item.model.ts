export class TaskItem {
  description: string;
  isDone: boolean;

  constructor(description: string) {
    this.description = description;
    this.isDone = false;
  }
}
