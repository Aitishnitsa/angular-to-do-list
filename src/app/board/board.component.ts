import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from '../task-container/task-container.component';
import { TaskContainer } from '../task-container';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskContainerComponent],
  template: `
    <main
      class="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 mb-4 sm:m-0 overflow-y-auto"
    >
      <div
        *ngFor="let container of taskContainers"
        class="sm:w-1/3 p-2 mx-2"
        (dragover)="onDragOver($event)"
        (drop)="onDrop($event, container.type)"
      >
        <app-task-container [taskContainer]="container"></app-task-container>
      </div>
    </main>
  `,
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  taskContainers: TaskContainer[] = [
    { type: 'todo', title: 'To do', color: 'bg-red-200' },
    { type: 'inprogress', title: 'In progress', color: 'bg-blue-200' },
    { type: 'done', title: 'Done', color: 'bg-green-200' },
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.fetchTasks();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('text/plain');
    if (taskData) {
      const task: Task = JSON.parse(taskData);
      const updatedTask = { ...task, status };

      this.taskService.updateTask(updatedTask).subscribe(() => {});
    }
  }
}
