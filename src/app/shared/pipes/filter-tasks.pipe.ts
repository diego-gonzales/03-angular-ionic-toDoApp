import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTasks',
  pure: false
})
export class FilterTasksPipe implements PipeTransform {

  transform(tasks: Task[], typeTasks: string): Task[] {
    if (typeTasks == 'finished') {
      return tasks.filter(task => task.isCompleted === true);
    } else {
      return tasks.filter(task => task.isCompleted === false);
    };
  }

}
