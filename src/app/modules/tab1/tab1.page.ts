import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { TasksService } from '../../core/services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tasksService: TasksService,
              private router: Router,
              private alertController: AlertController) {}

  async goToAddTask() {
    const alert = await this.alertController.create({
      header: 'Create new Task',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Task title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel..');
          }
        },
        {
          text: 'Create',
          handler: (data) => {
            if (data.title.trim().length === 0) return;
            const newTask = this.tasksService.postTask(data.title);
            this.router.navigate(['/tabs/tab1/task/', newTask.id]);
          }
        }
      ]
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  };

  goToTaskDetail(taskID: number) {
    this.router.navigate(['/tabs/tab1/task/', taskID]);
  };
}
