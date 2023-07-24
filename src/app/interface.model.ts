//Employee module
export interface IEmployee{
    id?:number;
    empId:string;
    empName:string;
    contactNo?:number;  
    email:string;
    gender:string;
    skill: ISkill[];

}

//skill module
export interface ISkill{
    name:string;
    experience:string;
}