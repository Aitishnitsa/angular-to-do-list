import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  URI = `https://${environment.API_KEY}.mockapi.io/tasks`;

  constructor(private http: HttpClient) { }

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URI);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.URI, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URI}/${id}`);
  }
}
