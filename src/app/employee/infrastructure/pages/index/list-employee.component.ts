import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeEntity } from '../../../domain/entities/employee.entity';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  providers: [DatePipe]
})
export class ListEmployeeComponent implements OnInit {
  public employees: EmployeeEntity[] = [];
  displayedColumns: string[] = [
    'fullName',
    'salary',
    'contractDate',
    'birthDate',
    'jobName',
    'afpName',
    'actions',
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.listEmployee().subscribe({
      next: (apiResponse) => {
        this.employees = apiResponse.data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  navigateToCreate() {
    this.router.navigate(['create']);
  }

  navigateToEdit(employee: EmployeeEntity) {
    this.router.navigate(['edit', employee.employeeId]);
  }

  deleteEmployee(employee: EmployeeEntity) {
    const prompt = `¿Seguro que quiere eliminar a ${employee.firstName} ${employee.lastName}?`;

    if (confirm(prompt)) {
      this.employeeService.deleteEmployee(employee.employeeId).subscribe({
        next: (apiResponse) => {
          if (apiResponse.success) {
            this.getEmployees();
          } else {
            alert(apiResponse.message);
          }
        },
        error: (error: any) => console.error(error),
      });
    }
  }

  formatDate(contractDate: string): string {
    return this.datePipe.transform(contractDate, 'dd/MM/yyyy')!;
  }
}
