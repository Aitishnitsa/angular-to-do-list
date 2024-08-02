import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { TaskContainerComponent } from './task-container/task-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BoardComponent,
    TaskContainerComponent,
  ],
  template: `
    <section
      class="bg-white dark:bg-black text-black dark:text-white h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <app-header
        class="flex justify-between items-center w-5/6 sm:w-2/3"
      ></app-header>
      <app-board
        class="animate-fade animate-duration-300 border-2 border-black dark:border-white rounded-lg w-5/6 sm:w-2/3 h-fit sm:h-2/3 mb-4 sm:m-0 py-2 px-4"
      ></app-board>
    </section>
  `,
})
export class AppComponent {
  title = 'angular-to-do-list';
}
