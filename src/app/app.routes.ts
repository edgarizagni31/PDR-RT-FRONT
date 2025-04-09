import { Routes } from '@angular/router';
import { ListEmployeeComponent } from './employee/infrastructure/pages/index/list-employee.component';
import { FormEmployeeComponent } from './employee/infrastructure/pages/form/form-employee.component';

export const routes: Routes = [
  { path: '', component: ListEmployeeComponent },
  { path: 'create', component: FormEmployeeComponent },
  { path: 'edit/:id', component: FormEmployeeComponent },
];
