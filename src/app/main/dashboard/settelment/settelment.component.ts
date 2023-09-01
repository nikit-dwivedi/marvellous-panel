import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { userListService } from 'app/services/user-list-service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrserviceService } from 'app/services/toastrservice.service';

@Component({
  selector: 'app-settelment',
  templateUrl: './settelment.component.html',
  styleUrls: ['./settelment.component.scss']
})
export class SettelmentComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 12;
  basicSelectedOption1: any = 'Settled';
  public ColumnMode = ColumnMode;
  public expanded = {};
  private exportCSVData: [] | any;
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  selectSettelmentForm: FormGroup

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'amount' }, { name: 'status' }, { name: 'bankName' }, { name: 'accountNumber' }, { name: 'ifsc' }];
  rows: any;

  data = [];
  blockUserId: any;
  filteredData = [];
  page: Number = 1;
  count: any;
  formula: string = 'all settelment';
  allSettelment: any;
  settelmentById:any;
  status = 'Settled';
  constructor(private userListService: userListService, private router: Router, private toastr:ToastrserviceService ,private modalService: NgbModal, config: NgbModalConfig) { }

  ngOnInit(): void {
    this.getAllSettelMent();
  }
  getStatus(event: any) {
    this.status = event.target.value
    this.getAllSettelMent();
  }

  getAllSettelMent(){
    this.userListService.getAllSettelment(this.status).subscribe((data: any) => {
      let formattedData:any
      if (data.items) {
        formattedData= data.items.map((settelmentData:any)=>{
          settelmentData.accountNumber = `\t${settelmentData.accountNumber}`
          return settelmentData
        })
      }
      this.allSettelment = data.items;
      this.rows = formattedData;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.data = this.allSettelment;
      this.filteredData = this.allSettelment;
    });
  }

  // open creat settelment Modal
  openSettelemntModal(data: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'md'
    })
  }

  // creat settelment
  createSettelment(){
    this.userListService.createSettelment().subscribe((data:any) => {
      if(data.status){
        this.toastr.showSuccess(data.message,"Success!");
        this.getAllSettelMent();
        
      }
      else{
        this.toastr.showError(data.message,"error!");
      }
    });
  }
  // open change settelment status Modal
  openSettelmentStatusChange(data:any,settelment:any){
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    
    this.settelmentById = settelment._id
    
  }
// change settelment status
  changeStatus(){
    this.userListService.chnageSettelmentStatus(this.settelmentById).subscribe((data:any) => {
      if(data.status){
        this.toastr.showSuccess(data.message,"Success!");
        this.getAllSettelMent();
        this.modalService.dismissAll();
      }
      else{
        this.toastr.showError(data.message,"error!");
      }
    })
  }
  filterUpdate(event: any) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys(this.allSettelment[0]);
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
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ['ID', 'Customer Id','Type', 'Amount', 'status', 'Full Name', 'Phone', 'Bank Name', 'A/c No.', 'IFSC'],
    }



    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);
      this.getAllSettelMent();

    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);
      this.getAllSettelMent();
      this.exportCSVData = undefined;


    }

  }
  onActivate(event: any) {
  }
}
