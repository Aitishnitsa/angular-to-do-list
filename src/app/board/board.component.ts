import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainerComponent } from '../task-container/task-container.component';
import { TaskContainer } from '../task-container';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    TaskContainerComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  template: `
    <main
      class="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 mb-4 sm:m-0 overflow-y-auto"
    >
      <div
        cdkDropListGroup
        class="w-full flex flex-col sm:flex-row items-center sm:justify-between sm:items-start"
      >
        <app-task-container
          *ngFor="let container of taskContainers"
          [taskContainer]="container"
          [connectedTo]="connectedToList(container.type)"
          class="w-full p-2 mx-2"
        ></app-task-container>
      </div>
    </main>
  `,
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  taskContainers: TaskContainer[] = [
    { type: 'todo', title: 'To do', color: 'bg-red-200' },
    { type: 'inprogress', title: 'In progress', color: 'bg-blue-200' },
    { type: 'done', title: 'Done', color: 'bg-green-200' },
  ];

  connectedToList(currentType: string): string[] {
    return this.taskContainers
      .filter((container) => container.type !== currentType)
      .map((container) => container.type);
  }
}
