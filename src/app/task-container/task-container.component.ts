import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainer } from '../task-container';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  template: `
    <h1
      [class]="taskContainer.color"
      class="text-black dark:text-black animate-jump-in w-full rounded-full py-1 flex justify-center font-bold relative z-10"
    >
      {{ taskContainer.title }}
    </h1>
    <div>
      <app-task
        *ngFor="let task of filteredTasks$ | async"
        [task]="task"
      ></app-task>
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

  addingMode: boolean = false;
  newTaskText: string = '';
  filteredTasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.filteredTasks$ = this.taskService.tasks$.pipe(
      map((tasks) =>
        tasks.filter((task) => task.status === this.taskContainer.type)
      )
    );
  }

  onAddClick() {
    this.addingMode = !this.addingMode;
  }

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.newTaskText = inputElement.value;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.newTaskText.trim() === '') return;
    const newTask: Task = {
      status: this.taskContainer.type,
      text: this.newTaskText,
      id: '0',
    };
    this.taskService.addTask(newTask).subscribe(() => {
      this.addingMode = false;
      this.newTaskText = '';
    });
  }
}
