import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../shared/constants';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { ApiResponse } from '../../../shared/interfaces';
import { CreateEmployeeDto } from '../../domain/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../domain/dto/update-employee.dto';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = `${API_URL}/employees`;

  constructor(private httpClient: HttpClient) {}

  listEmployee() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<ApiResponse<EmployeeEntity[]>>(this.apiUrl, {
      headers,
    });
  }

  getEmployee(employeeId: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<ApiResponse<EmployeeEntity>>(
      `${this.apiUrl}/${employeeId}`,
      { headers }
    );
  }

  createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<ApiResponse<EmployeeEntity>>(
      this.apiUrl,
      createEmployeeDto,
      { headers }
    );
  }

  updateEmployee(updateEmployeDto: UpdateEmployeeDto, employeeId: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put<ApiResponse<EmployeeEntity>>(
      `${this.apiUrl}/${employeeId}`,
      updateEmployeDto,
      { headers }
    );
  }

  deleteEmployee(employeeId: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.delete<ApiResponse<EmployeeEntity>>(
      `${this.apiUrl}/${employeeId}`,
      { headers }
    );
  }
}
