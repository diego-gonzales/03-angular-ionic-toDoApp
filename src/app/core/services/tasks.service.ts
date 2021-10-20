import { Injectable } from '@angular/core';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Task[] = [];

  constructor() {
    // const task1 = new Task('Collect Infinite Stones');
    // const task2 = new Task('Play videogames');
    // this.tasks.push(task1, task2);

    this.loadFromLocalStorage();
  }


  postTask(title: string): Task {
    const newTask = new Task(title);
    this.tasks.push(newTask);
    this.saveOnLocalStorage();

    return newTask;
  };

  getTaskById(taskID: string): Task {
    return this.tasks.find(task => task.id === Number(taskID));
  };

  deleteTask(taskID: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskID);
    this.saveOnLocalStorage();
  };


  // Local Storage Methods
  saveOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  loadFromLocalStorage() {
    if (!localStorage.getItem('tasks')) return;
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
  };

}
