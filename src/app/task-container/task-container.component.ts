import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainer } from '../task-container';
import { TaskComponent } from "../task/task.component";
import { Task } from '../task';

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.css'
})
export class TaskContainerComponent {
  @Input() taskContainer!: TaskContainer;

  tasks: Task[] = [
    {
      "status": "todo",
      "text": "2",
      "id": "2"
    },
    {
      "status": "inprogress",
      "text": "3",
      "id": "3"
    },
    {
      "status": "done",
      "text": "new task",
      "id": "12"
    },
    {
      "status": "todo",
      "text": "to do app",
      "id": "16"
    },
    {
      "status": "inprogress",
      "text": "hello world",
      "id": "17"
    }
  ]
}
