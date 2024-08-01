import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white dark:bg-black hover:bg-gray-50
        dark:hover:bg-gray-950 animate-slide-in-blurred-top transition ease-in-out duration-150 border-2 border-black
        dark:border-white rounded-md w-full py-1 px-2 my-2 flex justify-between items-center group"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      {{ task.text }}
      @if (isShown || screenWidth < 800) {
      <button (click)="onDeleteClick()">
        <svg
          class="fill-black dark:fill-white opacity-25 hover:opacity-100 transition duration-150"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_11_6)">
            <path
              d="M10.8333 0H9.16666C8.50362 0 7.86774 0.263392 7.39889 0.732233C6.93005 1.20107 6.66666 1.83696 6.66666 2.5V3.33333H1.66666C1.44565 3.33333 1.23369 3.42113 1.07741 3.57741C0.921126 3.73369 0.833328 3.94565 0.833328 4.16667C0.833328 4.38768 0.921126 4.59964 1.07741 4.75592C1.23369 4.9122 1.44565 5 1.66666 5H2.49999V16.6667C2.49999 17.5507 2.85118 18.3986 3.47631 19.0237C4.10143 19.6488 4.94927 20 5.83333 20H14.1667C15.0507 20 15.8986 19.6488 16.5237 19.0237C17.1488 18.3986 17.5 17.5507 17.5 16.6667V5H18.3333C18.5543 5 18.7663 4.9122 18.9226 4.75592C19.0789 4.59964 19.1667 4.38768 19.1667 4.16667C19.1667 3.94565 19.0789 3.73369 18.9226 3.57741C18.7663 3.42113 18.5543 3.33333 18.3333 3.33333H13.3333V2.5C13.3333 1.83696 13.0699 1.20107 12.6011 0.732233C12.1323 0.263392 11.4964 0 10.8333 0ZM8.33333 2.5C8.33333 2.27899 8.42113 2.06702 8.57741 1.91074C8.73369 1.75446 8.94565 1.66667 9.16666 1.66667H10.8333C11.0543 1.66667 11.2663 1.75446 11.4226 1.91074C11.5789 2.06702 11.6667 2.27899 11.6667 2.5V3.33333H8.33333V2.5ZM15.8333 16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.3913 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16666 17.1087 4.16666 16.6667V5H15.8333V16.6667Z"
            />
            <path
              d="M10 7.5C9.77899 7.5 9.56703 7.5878 9.41075 7.74408C9.25447 7.90036 9.16667 8.11232 9.16667 8.33333V15C9.16667 15.221 9.25447 15.433 9.41075 15.5893C9.56703 15.7455 9.77899 15.8333 10 15.8333C10.221 15.8333 10.433 15.7455 10.5893 15.5893C10.7455 15.433 10.8333 15.221 10.8333 15V8.33333C10.8333 8.11232 10.7455 7.90036 10.5893 7.74408C10.433 7.5878 10.221 7.5 10 7.5Z"
            />
            <path
              d="M12.5 15C12.5 15.221 12.5878 15.433 12.7441 15.5893C12.9004 15.7455 13.1123 15.8333 13.3333 15.8333C13.5543 15.8333 13.7663 15.7455 13.9226 15.5893C14.0789 15.433 14.1667 15.221 14.1667 15V8.33333C14.1667 8.11232 14.0789 7.90036 13.9226 7.74408C13.7663 7.5878 13.5543 7.5 13.3333 7.5C13.1123 7.5 12.9004 7.5878 12.7441 7.74408C12.5878 7.90036 12.5 8.11232 12.5 8.33333V15Z"
            />
            <path
              d="M6.66666 7.5C6.44565 7.5 6.23369 7.5878 6.07741 7.74408C5.92113 7.90036 5.83333 8.11232 5.83333 8.33333V15C5.83333 15.221 5.92113 15.433 6.07741 15.5893C6.23369 15.7455 6.44565 15.8333 6.66666 15.8333C6.88768 15.8333 7.09964 15.7455 7.25592 15.5893C7.4122 15.433 7.49999 15.221 7.49999 15V8.33333C7.49999 8.11232 7.4122 7.90036 7.25592 7.74408C7.09964 7.5878 6.88768 7.5 6.66666 7.5Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_11_6">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      }
    </div>
  `,
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();

  isShown: boolean = false;
  screenWidth: any;
  dragData: Task | null = null;

  constructor(
    private tasksService: TaskService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }
  onMouseEnter() {
    this.isShown = true;
  }

  onMouseLeave() {
    this.isShown = false;
  }

  onDeleteClick() {
    this.tasksService.deleteTask(this.task.id).subscribe(() => {
      console.log('deleted!', this.task.id);
      this.taskDeleted.emit(this.task.id);
    });
  }
}
