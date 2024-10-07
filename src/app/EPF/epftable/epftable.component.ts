import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EpfService } from '../service/epf.service';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { IEmployee } from '../model/epf';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-epftable',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './epftable.component.html',
  styleUrl: './epftable.component.scss'
})
export class EPFTableComponent implements OnInit,OnDestroy{

  private service:EpfService = inject(EpfService);
  errorMessage:string = '';
  sub!:Subscription;
 empForm!:FormGroup
 private fb: FormBuilder = inject(FormBuilder);
  employeesData:IEmployee[] = [];
  transformedEmployees:any[] = [];
  filteredtransformedEmps:any[] = [];
  ngOnInit(): void {
    this.empForm = this.fb.group({
        empNo:['']
    })
   this.sub = this.service.getEmployees()
                .pipe(
                  catchError(err=>{
                    this.errorMessage = err
                    return EMPTY;
                  })
                )
                .subscribe(
                  (result:IEmployee[])=>{
                    this.employeesData = result;
                    this.transformedEmployees = this.transformEmpData();
                    this.filteredtransformedEmps = this.transformedEmployees;
                });
                this.empNo?.valueChanges.subscribe(value=>{
                  this.filteredtransformedEmps = (value ) ? this.getFilteredData(value) : this.transformedEmployees
                })
              
                
  }
  get empNo(){
    return this.empForm.get('empNo');
  }
  transformEmpData(){
   return  this.employeesData.reduce((result:any[],emp:IEmployee)=>{
        let empData:{empNo:number,employeeName:string,[key:string]:any} = {
          empNo: emp.epfNumber,
          employeeName: emp.employeeName,
          totalWorkHours: emp.totalWorkHours,
          totalOTHours: emp.totalOtHours,
          totalLateDays: emp.totalLateDays
      
        }
        emp.dailySums.forEach(daily=>{
          empData[daily.inDate_] = {
            inTime:daily.inTime,
            outTime:daily.outTime,
            totalWorkedHours:daily.totalWorkedHours,
            oTHrs:daily.sumOtHours
          };
        });
         result.push(empData)
         return result;
     },[])
    
  }
  getUniqueDates(){
  
    let yearMonthData =Array.from(new Set(this.employeesData.map(d=>d.month)));
    if (yearMonthData.length === 0) {
      console.error("No month data available");
      return; 
    }
    const yearMonth =yearMonthData[0].split('-');
    
   const result =  this.getDatesForMonth(Number(yearMonth[0]),Number(yearMonth[1]));
   return result;
  }
  getDatesForMonth(year:number,month:number){
    let dates: string[] = [];
     
    let lastDay = new Date(year, month, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dates.push(formattedDate); 
    }

    return dates;
  }
  getFilteredData(empNo:string){
    
    return this.transformedEmployees.filter(x=> x.empNo.toString().includes(empNo));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
