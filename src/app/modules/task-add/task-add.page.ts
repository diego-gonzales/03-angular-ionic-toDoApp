import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TasksService } from '../../core/services/tasks.service';
import { Task } from '../../shared/models/task.model';
import { TaskItem } from '../../shared/models/task-item.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
})
export class TaskAddPage implements OnInit {

  task: Task;
  descriptionTaskItem: string = '';

  constructor(private tasksService: TasksService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.activatedRoute.snapshot.paramMap.get('idTask');
    this.activatedRoute.params
        .subscribe(({ idTask }) => this.getTask(idTask));
  }

  getTask(taskID: string) {
    this.task = this.tasksService.getTaskById(taskID);
  };

  addTaskItem() {
    if (this.descriptionTaskItem.trim().length === 0) return;

    const newTaskItem = new TaskItem(this.descriptionTaskItem);

    this.task.taskItems.push(newTaskItem);
    this.descriptionTaskItem = '';
    this.tasksService.saveOnLocalStorage();
    console.log(this.tasksService.tasks)

  };

  onChangeCheckbox(taskItem: TaskItem) {
    const numberIncompleteTaskItems = this.task.taskItems
                                          .filter(taskItem => taskItem.isDone === false)
                                          .length;

    if (numberIncompleteTaskItems === 0) {
      this.task.finishedAt = new Date();
      this.task.isCompleted = true;
    } else {
      this.task.finishedAt = null;
      this.task.isCompleted = false;
    };

    this.tasksService.saveOnLocalStorage();
    console.log(this.tasksService.tasks)
  };

  deleteTaskItem(indexTaskItem: number) {
    this.task.taskItems.splice(indexTaskItem, 1);
    this.tasksService.saveOnLocalStorage();
  };
}
