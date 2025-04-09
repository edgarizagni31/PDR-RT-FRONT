import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../../shared/constants';
import { ApiResponse } from '../../../shared/interfaces';
import { JobEntity } from '../../domain/entities/job.entity';

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly apiUrl = `${API_URL}/jobs`;

  constructor(private httpClient: HttpClient) {}

  listJobs() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.httpClient.get<ApiResponse<JobEntity[]>>(this.apiUrl, {headers});
  }
}
