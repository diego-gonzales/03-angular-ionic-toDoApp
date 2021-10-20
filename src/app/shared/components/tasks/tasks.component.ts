import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TasksService } from '../../../core/services/tasks.service';
import { Task } from '../../models/task.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  @Input() actualTab: string;
  @ViewChild(IonList) list: IonList;

  constructor(public tasksService: TasksService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  goToTaskDetail(taskID: number) {
    if (this.actualTab === 'pending') {
      this.router.navigate(['/tabs/tab1/task', taskID]);
    };
    if (this.actualTab === 'finished') {
      this.router.navigate(['/tabs/tab2/task', taskID]);
    };
  };

  async editTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Edit Task',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: task.title,
          placeholder: 'Task title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel..');
            this.list.closeSlidingItems(); // close open slidigins
          }
        },
        {
          text: 'Edit',
          handler: (data) => {
            if (data.title.trim().length === 0) return;
            task.title = data.title;
            this.tasksService.saveOnLocalStorage();

            this.list.closeSlidingItems(); // close open slidigins
          }
        }
      ]
    });

    await alert.present();
  };

  deleteTask(taskID: number) {
    this.tasksService.deleteTask(taskID);
  };
}
