import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from '../task-container/task-container.component';
import { TaskContainer } from '../task-container';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskContainerComponent],
  template: `
  <main
    class="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 mb-4 sm:m-0 overflow-y-auto">
      <app-task-container class="sm:w-1/3 p-2 mx-2"
      *ngFor='let container of taskContainers'
      [taskContainer]="container"
      ></app-task-container>
  </main>
  `,
  styleUrl: './board.component.css'
})
export class BoardComponent {
  taskContainers: TaskContainer[] = [
    { type: "todo", title: "To do", color: "bg-red-200" },
    { type: "inprogress", title: "In progress", color: "bg-blue-200" },
    { type: "done", title: "Done", color: "bg-green-200" },
  ];
}
