import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { EmployeeServiceService } from '../services/employee-service.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.scss'],

})
export class AddUpdateEmployeeComponent implements OnInit {
  addEmployeeForm: any;
  editEmp: any;
  employeeTableid: any;

  constructor(private _service: EmployeeServiceService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _toster:ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
//Initalize the reactive Form Control
    this.addEmployeeForm = new FormGroup({
      id: new FormControl(null),
      empId: new FormControl("", [Validators.required]),
      empName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      contactNo: new FormControl(null, [Validators.required,Validators.min(10000),Validators.max(1000000000000)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      gender: new FormControl("", [Validators.required]),
      skill: new FormArray([
        this.addSkill()
      ])
    });
//get the id for update (put) form opretaions 
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.employeeTableid = id;
      if (id) {
        this.getEmployee(+id);
      }
    });
  }

//get employee details by id and passing to the assingment 
  getEmployee(id: number) {
    this._service.getEmployeeById(id).subscribe(
      (employee) => this.updateEmployee(employee),
      (err: any) => console.log(err)
    );
  }

//set the value to the controller in update method
  updateEmployee(emp: any) {
    let employee = emp[0];
    this.addEmployeeForm.patchValue({
      id: employee.id,
      empId: employee.empId,
      empName: employee.empName,
      contactNo: employee.contactNo,
      email: employee.email,
      gender: employee.gender
    });
    const control = <FormArray>this.addEmployeeForm.controls['skill'];
    control.removeAt(0);
    employee.skill.forEach((s: any) => {
      control.push(this.addSkillupdate(s)
      );
    })
  }

//Fetch the skills that are in update employee record
  addSkillupdate(s: any): FormGroup {
    return new FormGroup({
      name: new FormControl(s.name, Validators.required),
      experience: new FormControl(s.experience, Validators.required)
    })
  }

//creates the skill form group
  addSkill(): FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      experience: new FormControl("", Validators.required)
    })
  }

  //define getter for the skill foreach loop purpose
  get skillControls() {
    return (<FormArray>this.addEmployeeForm.get('skill')).controls;
  }

//on add skill button adding the skill
  onAddSkillButtonClick() {
    const control = <FormArray>this.addEmployeeForm.controls['skill'];
    control.push(this.addSkill()
    );
  }

  //on delete skill button delete skill
  deleteSkillButtonClick(id: number) {
    const control = <FormArray>this.addEmployeeForm.controls['skill'];
    control.removeAt(id);
  }

  AddEmployee() {
    //updating the old employee
    if (this.employeeTableid) {
      this._service.updateEmployee(this.employeeTableid, this.addEmployeeForm.value).subscribe((result) => { console.warn(result),
         this._toster.success('Employee Updated Sucessfully'); });
      this._route.navigate(['list']);
    }
    //adding new employee
    else {
      this._service.addEmployee(this.addEmployeeForm.value).subscribe((result) => { console.warn(result),
        this._toster.success('Employee Added Sucessfully'); });
      this._route.navigate(['list']);
    }
  }

}
