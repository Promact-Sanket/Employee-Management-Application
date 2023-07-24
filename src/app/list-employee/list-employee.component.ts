import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../services/employee-service.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: any;
  employee: any;

  constructor(public _router: Router,
    private _toaster: ToastrService,
    private _service: EmployeeServiceService) { }

  ngOnInit(): void {
   this.getallEmployee();
  }

//get all employee list
  getallEmployee() {
    this._service.getEmployeelist().subscribe((data) => {
      this.employeeList = data
      console.log(data);
    });

  }

  //delete employee with confirmation
  deleteEmployee(Id: number, Name: string) {
    if (confirm("Are you sure you want to delete " + Name)) {
      this._service.deleteEmployee(Id).subscribe((result) => { console.warn(result),
      this._toaster.success("Employee deleted Sucessfully")},
      err=>{console.log(err)}
      );
      this.getallEmployee();
    }
  }

  //update employee redirection
  updateEmployee(id: number) {
    this._router.navigate(['/edit',id]);
  }

}
