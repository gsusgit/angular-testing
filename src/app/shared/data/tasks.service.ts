import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasksByProjectId$(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiHost}projects/${projectId}/tasks`);
  }
}
