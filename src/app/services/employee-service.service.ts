import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, Subject } from "rxjs";
import { IEmployee } from '../interface.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http: HttpClient) { }

  employeeDetail= new Subject<IEmployee>();

EnmployeeUrl='http://localhost:3000/Employee';
  getEmployeelist()
  {
    return this.http.get(`${this.EnmployeeUrl}`);
  }

  getEmployeeById(id:number)
  {
    return this.http.get(`${this.EnmployeeUrl}?id=${id}`)
  }

  addEmployee(data:IEmployee)
  {
    return this.http.post(`${this.EnmployeeUrl}`,data);
  }

  updateEmployee(id:number, data:IEmployee)
  {
    return this.http.put(`${this.EnmployeeUrl}/${id}`,data);
  }

  deleteEmployee(id:number)
  {
    return this.http.delete(`${this.EnmployeeUrl}/${id}`);
  }

  
}
