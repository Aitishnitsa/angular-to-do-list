import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainer } from '../task-container';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../task.service';
import { Task } from '../task';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  template: `
    <div
      cdkDropList
      [cdkDropListData]="filteredTasks"
      [cdkDropListConnectedTo]="connectedTo"
      (cdkDropListDropped)="drop($event)"
    >
      <h1
        [class]="taskContainer.color"
        class="text-black dark:text-black animate-jump-in w-full rounded-full py-1 flex justify-center font-bold relative z-10"
      >
        {{ taskContainer.title }}
      </h1>
      <app-task
        cdkDrag
        *ngFor="let task of filteredTasks"
        [task]="task"
        (taskDeleted)="handleTaskDeleted($event)"
      >
      </app-task>
    </div>
    @if (addingMode) {
    <form
      (submit)="handleSubmit($event)"
      class="border-2 border-black dark:border-white rounded-md w-full py-1 px-2 my-2"
    >
      <input
        [value]="newTaskText"
        (input)="handleInput($event)"
        name="input"
        placeholder="Enter new task"
        class="focus-visible:outline-none w-full bg-transparent"
      />
    </form>
    }
    <button
      class="animate-flip-up animate-delay-300 px-2 opacity-25 hover:opacity-100 transition ease-in-out duration-150"
      (click)="onAddClick()"
    >
      + add task
    </button>
  `,
})
export class TaskContainerComponent implements OnInit {
  @Input() taskContainer!: TaskContainer;
  @Input() connectedTo: string[] = [];

  addingMode: boolean = false;
  newTaskText: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.fetchTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(
      (task) => task.status === this.taskContainer.type
    );
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const updatedTask = event.container.data[event.currentIndex];
      updatedTask.status = this.taskContainer.type;

      this.taskService.updateTask(updatedTask).subscribe(() => {});
    }
  }

  onAddClick(): void {
    this.addingMode = !this.addingMode;
  }

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.newTaskText = inputElement.value;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.newTaskText.trim() === '') return;
    const newTask: Task = {
      status: this.taskContainer.type,
      text: this.newTaskText,
      id: '0',
    };
    this.taskService.addTask(newTask).subscribe(() => {
      this.tasks.push(newTask);
      this.addingMode = false;
      this.newTaskText = '';
      this.filterTasks();
    });
  }

  handleTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.filterTasks();
  }
}
