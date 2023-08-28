import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { userListService } from 'app/services/user-list-service';
import { ToastrserviceService } from 'app/services/toastrservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.scss']
})
export class KycListComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public basicSelectedOption1: boolean = true;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  cols = [{ name: 'name' }, { name: 'occupation' }, { name: 'aadhaarNumber' }, { name: 'panNumber' }, { name: 'isVerified' }];

  rows: any;
  data = [];
  blockUserId: any;
  filteredData = [];
  submitted: boolean = false;
  formula: string = 'kyc list';
  kycList: any;
  customId: any;
  verified: any;
  verifiedData: Boolean = true;
  kycStatus: any;
  isverified: Boolean;
  isnotVerified: Boolean;
  constructor(private userListService: userListService, private router: Router, private toastr: ToastrserviceService, private fb: FormBuilder, private modalService: NgbModal, config: NgbModalConfig) { }

  ngOnInit(): void {
    this.allKycList();
  }


  selcectStatus(event: any) {
    this.verified = event.target.value;
    this.verifiedData = JSON.parse(this.verified)
    // console.log(this.verified);

    this.allKycList();
  }

  allKycList() {
    const body = {
      isVerified: this.verifiedData
    }
    this.userListService.getkycList(body).subscribe((data: any) => {
      this.kycList = data.items;
      this.rows = data.items;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.data = this.kycList;
      this.filteredData = this.kycList;
       
      if (this.kycList) {
        for (this.kycStatus of this.kycList) {
          this.isverified = this.kycStatus.isVerified;
          this.isnotVerified = !this.kycStatus.isVerified;
        }
      }
    })
  }
  viewDetails(row:any){
    this.router.navigate(["/dashboard/customerDetails"], { state: { data: row } });
  }

  // open kyc statuschange Modal
  openKycStatusChangeModal(data: any, kycList: any) {
    this.modalService.open(data, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    this.customId = kycList.customId
    console.log(this.customId);
  }

  // verify kyc method
  verifyKyc() {
    const formData = {
      isVerified: true
    }
    this.userListService.verifyKycById(this.customId, formData).subscribe((data: any) => {
      if (data.status) {
        this.toastr.showSuccess(data.message, "Success!");
        this.allKycList();
        this.modalService.dismissAll();
      }
      else {
        this.toastr.showError(data.message, "error!");
        this.allKycList();
      }
    })
  }

  // unverify kyc method
  unVerifyKyc() {
    const formData = {
      isVerified: false
    }
    this.userListService.verifyKycById(this.customId, formData).subscribe((data: any) => {
      if (data.status) {
        this.toastr.showSuccess(data.message, "Success!");
        this.allKycList();
        this.modalService.dismissAll();
      }
      else {
        this.toastr.showError(data.message, "error!");
        this.allKycList();
      }
    })
  }

  filterUpdate(event: any) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys(this.kycList[0]);
    this.data = this.filteredData.filter(function (item: any): | any {
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]?.toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
    this.kitchenSinkRows = this.data;
    this.table.offset = 0;
  }
  onSelect({ selected }: any) {
    this.exportCSVData = selected;
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
      headers: ['ID', 'Customer Id', 'Full Name', 'Occupation', 'Selfie', 'Adhaar Number', 'Adhaar Front', 'Adhaar Back', 'Pan Number', 'panFront', 'Verified', 'createdAt', 'updatedAt']
      ,
    }
    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);
      this.allKycList();
    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);
      this.allKycList();
      this.exportCSVData = undefined;
    }

  }
  onActivate(event: any) {
    // console.log('Activate Event', event.type);
  }
}
