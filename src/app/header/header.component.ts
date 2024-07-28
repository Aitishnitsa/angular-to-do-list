import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  today: number = Date.now();
  isDarkMode: boolean = false;

  onThemeSwitchChange() {
    this.isDarkMode = !this.isDarkMode;

    this.isDarkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }

  // Error... Page / did not render in 30 seconds.
  // constructor() {
  //   setInterval(() => {
  //     this.today = Date.now();
  //   }, 1000);
  // }
}
