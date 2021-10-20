import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TasksComponent } from './components/tasks/tasks.component';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';



@NgModule({
  declarations: [
    TasksComponent,
    FilterTasksPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TasksComponent
  ]
})
export class SharedModule { }
