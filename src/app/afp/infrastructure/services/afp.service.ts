import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../../shared/constants';
import { ApiResponse } from '../../../shared/interfaces';
import { AFPEntity } from '../../domain/entities/AFP.entity';

@Injectable({ providedIn: 'root' })
export class AfpService {
  private readonly apiUrl = `${API_URL}/afps`;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {}

  listAfps() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<ApiResponse<AFPEntity[]>>(this.apiUrl, {
      headers,
    });
  }
}
