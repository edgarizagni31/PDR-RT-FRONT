import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AfpService } from '../../../../afp/infrastructure/services/afp.service';
import { JobService } from '../../../../jobs/infrastructure/services/job.service';
import { AFPEntity } from '../../../../afp/domain/entities/AFP.entity';
import { JobEntity } from '../../../../jobs/domain/entities/job.entity';
import { EmployeeService } from '../../services/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CreateEmployeeDto } from '../../../domain/dto/create-employee.dto';
import { ApiResponse } from '../../../../shared/interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class FormEmployeeComponent implements OnInit {
  public isEditMode: boolean = false;
  public employeeId: number = -1;
  public afps: AFPEntity[] = [];
  public jobs: JobEntity[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  public formGroup: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    salary: [0],
    contractDate: [''],
    birthDate: [''],
    afp: [''],
    job: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private afpService: AfpService,
    private jobService: JobService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.isEditMode = !!id;

      if (id) {
        this.employeeId = +id;
        this.employeeService.getEmployee(+id).subscribe({
          next: (apiResponse) => {
            if (apiResponse.success) {
              console.log(apiResponse);
              
              this.formGroup.patchValue({
                firstName: apiResponse.data.firstName,
                lastName: apiResponse.data.lastName,
                salary: apiResponse.data.salary,
                contractDate: apiResponse.data.contractDate,
                birthDate: apiResponse.data.birthDate,
                afp: apiResponse.data.afpId,
                job: apiResponse.data.jobId,
              });
            } else {
              alert(apiResponse.message);
            }
          },
          error: (error) => console.log(error),
        });
      }
    });

    this.afpService.listAfps().subscribe({
      next: (apiResponse) => {
        if (apiResponse.success) {
          this.afps = apiResponse.data;
        }
      },
      error: (error) => console.error(error),
    });

    this.jobService.listJobs().subscribe({
      next: (apiResponse) => {
        if (apiResponse.success) {
          this.jobs = apiResponse.data;
        }
      },
      error: (error) => console.error(error),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const employee: CreateEmployeeDto = {
        firstName: this.formGroup.value.firstName,
        lastName: this.formGroup.value.lastName,
        salary: this.formGroup.value.salary,
        contractDate: this.formGroup.value.contractDate,
        birthDate: this.formGroup.value.birthDate,
        jobId: +this.formGroup.value.job,
        afpId: +this.formGroup.value.afp,
      };

      console.log(employee);
      
      if (this.isEditMode) {
        this.employeeService
          .updateEmployee(employee, this.employeeId)
          .subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (apiResponse: ApiResponse<string[]>) =>
              alert(apiResponse.data.join('\n')),
          });
      } else {
        this.employeeService.createEmployee(employee).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: ({ error }: { error: ApiResponse<string[]> }) =>
            alert(error.data.join('\n')),
        });
      }
    }
  }
}
