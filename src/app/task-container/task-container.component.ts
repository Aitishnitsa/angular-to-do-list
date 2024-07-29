import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskContainer } from '../task-container';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task';
import { TaskService } from '../task.service';

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
    <div (dragover)="onDragOver($event)" (drop)="onDrop($event)">
      <app-task
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
export class TaskContainerComponent {
  @Input() taskContainer!: TaskContainer;

  addingMode: boolean = false;
  newTaskText: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.fetchTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(
      (task) => task.status === this.taskContainer.type
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
    this.tasksService.addTask(newTask).subscribe((task) => {
      this.tasks.push(task);
      this.filterTasks();
      this.addingMode = false;
      this.newTaskText = '';
    });
  }

  handleTaskDeleted(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.filterTasks();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('text/plain');
    if (taskData) {
      const task: Task = JSON.parse(taskData);
      const updatedTask = { ...task, status: this.taskContainer.type };

      this.tasksService.updateTask(updatedTask).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
