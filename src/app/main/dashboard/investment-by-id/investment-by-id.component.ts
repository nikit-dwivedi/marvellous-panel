import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { userListService } from 'app/services/user-list-service';
import { Router, Navigation } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { ToastrserviceService } from 'app/services/toastrservice.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-investment-by-id',
  templateUrl: './investment-by-id.component.html',
  styleUrls: ['./investment-by-id.component.scss']
})
export class InvestmentByIdComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public basicSelectedOption1: any = 'Select Plan';
  public ColumnMode = ColumnMode;
  public expanded = {};
  private exportCSVData: [] | any;
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  newInvestForm:FormGroup;
  editInvestForm:FormGroup;
  
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'amount' }, { name: 'interest' }, { name: 'locking' }, { name: 'planName' }, { name: 'date' }, { name: 'expireDate' }, { name: 'profit' }];
  rows: any;
  
  data = [];
  blockUserId : any;
  filteredData = [];
  customId:any;
  investByIdList:any;
  cutomerId:any;
  selectedPlan:any
  editByid:any;
  certificate:any;
  pdfContent: any;
  constructor(private toastr:ToastrserviceService,private userListService:userListService,private router:Router,private modalService: NgbModal, config: NgbModalConfig, private fb:FormBuilder) { 
   let nav:Navigation = this.router.getCurrentNavigation();
   if (!nav.extras.state || !nav.extras.state.data) {
    this.router.navigate(["dashboard/allCustomer"])
   }
   this.customId = nav.extras.state.data.customId ?? nav.extras.state.data.customerId;
  }

  ngOnInit(): void {
   this.investmentById();

  //  add new investment form
   this.newInvestForm = this.fb.group({
    planName: new FormControl(''),
    amount: new FormControl(''),
    locking:new FormControl(''),
    interest: new FormControl('')
   });

  //  edit investment form
  this.editInvestForm = this.fb.group({
    planName: new FormControl(''),
    amount: new FormControl(''),
    interest: new FormControl(''),
    locking:new FormControl(''),
    expireDate:new FormControl('')
  })
  }

  
  get b(){
    return this.newInvestForm.controls;
  }

  get f(){
    return this.editInvestForm.controls;
  }

// add new investment Modal Open
openNewInvestmentModal(data:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg',
  });
  
 }
 
 selectPlan(event:any){
  this.selectedPlan = event.target.value;
 }
 newInvestFormSubmit(){
  if(this.newInvestForm.invalid){
    return;
  }
  else{

    const formData = {
      planName:this.selectedPlan,
      amount:this.newInvestForm.value.amount,
      locking:this.newInvestForm.value.locking,
      interest:this.newInvestForm.value.interest
    }

  this.userListService.creatNewInvestment(formData,this.customId).subscribe((data:any)=>{
       
      if(data.status){
        this.toastr.showSuccess(data.message,"Succes!");
        this.investmentById();
        this.newInvestForm.reset();
        this.modalService.dismissAll();
      }
      else{
        this.toastr.showError(data.message,"error!");
      }
    });
  }
 }

//  get all investment by id
 investmentById(){
  this.userListService.getInvestById(this.customId).subscribe((data:any) => {
    this.investByIdList = data.items;
    this.rows = data.items;
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
    this.data = this.investByIdList;
    this.filteredData = this.investByIdList;
});
 }
  
//  eidt investment by id
openEditinvestmentModal(data:any,edit:any){
  this.modalService.open(data,{
    centered:true,
    scrollable:true,
    size:'lg'
  });
  this.editByid = edit.investmentId;
   
  this.editInvestForm.patchValue({
    planName:edit.planName,
    amount:edit.amount,
    interest:edit.interest,
    locking:edit.locking,
    expireDate:this.formateDate(edit.expireDate)
  })
}
 
editInvestFormSubmit(){
  if(this.editInvestForm.invalid){
    return;
  }
  else{
    
    const formData = {
      planName:this.editInvestForm.value.planName,
      amount:this.editInvestForm.value.amount,
      interest:this.editInvestForm.value.interest,
      locking:this.editInvestForm.value.locking,
      expireDate:this.formateDate(this.editInvestForm.value.expireDate)
    }

    this.userListService.editInvestment(this.editByid,formData).subscribe((data:any) => {
      if(data.status){
        this.toastr.showSuccess(data.message,"Success!");
        this.investmentById();
        this.modalService.dismissAll();
      }
      else{
        this.toastr.showError(data.message,"error!");
      }
    })
}
}

formateDate(rawDate:any){
  let [first,second,third] = rawDate.split("-")
  if (second.length==1) {
    second=`0${second}`
  }
  return `${third}-${second}-${first}`
}

// download receipt method
download(investment:any){
  console.log(investment);
  const body = {
    investmentId : investment.investmentId
  }
  this.userListService.downloadReceipt(body).subscribe((data:any) => {
    
    if(data){
      const blob = new Blob([data], { type: 'application/pdf' });
      console.log(blob);
      const url = window.URL.createObjectURL(data);
      window.open(url);
      this.toastr.showSuccess(data.message,"Success!");
      this.investmentById();
    }
    else{
      this.toastr.showError(data.message,"error!");
    }
  })
  
}

// generatePDF(pdfContent:any) {
//   this.pdfContent = pdfContent;
//   const doc = new jsPDF();
//   const specialElementHandlers = {
//     '#editor': function(element: any, renderer: any) {
//       return true;
//     }
//   };
//   const content = this.pdfContent.nativeElement;
//   doc.fromHTML(content.innerHTML, 15, 15, {
//     'width': 190,
//     'elementHandlers': specialElementHandlers
//   });
  
//   doc.save('pdfName.pdf');
// }

filterUpdate(event: any) {
      let val = event.target.value.toLowerCase();
      let colsAmt = this.cols.length;
      let keys = Object.keys(this.investmentById[0]);
      this.data = this.filteredData.filter(function (item: any): | any {
        for (let i = 0; i < colsAmt; i++) {
          if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
            return true;
          }
        }
      });
    
    
      this.kitchenSinkRows = this.data;
      this.table.offset = 0;
    
    }
  
    onSelect({ selected }: any) {
      // this.exportCSVData = selected;
      // this.selected.splice(0, this.selected.length);
      //this.selected.push(...selected);
    }

    downloadCSV(event: any) {
      // var options = {
      //   fieldSeparator: ',',
      //   quoteStrings: '"',
      //   decimalseparator: '.',
      //   showLabels: true,
      //   showTitle: true,
      //   title: '',
      //   useBom: true,
      //   noDownload: false,
      //   headers: ['ID', 'fullname', 'phone', 'investAmount', 'locking', 'profit', 'interest', 'date'],
      // }
  
  
  
      // if (this.exportCSVData == undefined) {
      //   const fileInfo = new ngxCsv(this.tempData, this.formula, options);
      //   this.Allportfolio();
  
      // } else {
      //   const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);
      //   this.Allportfolio();
      //   this.exportCSVData = undefined;
  
  
      // }
      
    }
    onActivate(event: any) {
      // console.log('Activate Event', event.type);
    }
}
