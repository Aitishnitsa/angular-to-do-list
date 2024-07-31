import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URI = `https://${environment.API_KEY}.mockapi.io/tasks`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchTasks(): void {
    this.http.get<Task[]>(this.URI).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.URI, task)
      .pipe(tap(() => this.fetchTasks()));
  }

  deleteTask(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.URI}/${id}`)
      .pipe(tap(() => this.fetchTasks()));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`${this.URI}/${task.id}`, task)
      .pipe(tap(() => this.fetchTasks()));
  }
}
