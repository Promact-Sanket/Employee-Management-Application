import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateEmployeeComponent } from './add-update-employee/add-update-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

const routes: Routes = [
  {
    path: 'list',   
    component:ListEmployeeComponent ,    
  },
  {
    path:'create',
    component:AddUpdateEmployeeComponent
  },
  {
    path:'edit/:id',
    component:AddUpdateEmployeeComponent
  },
  {
    path: '',   
    component:ListEmployeeComponent ,    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
