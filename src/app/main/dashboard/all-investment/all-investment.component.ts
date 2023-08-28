import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { userListService } from 'app/services/user-list-service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-investment',
  templateUrl: './all-investment.component.html',
  styleUrls: ['./all-investment.component.scss']
})
export class AllInvestmentComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 12;
  public ColumnMode = ColumnMode;
  public expanded = {};
  private exportCSVData: [] | any;
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  
  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  
  // cols = [{ name: 'name' }, { name: 'phone' }, { name: 'amount' }, { name: 'date' }];
  cols = [{ name: 'name' }, { name: 'phone' }, { name: 'amount' }, { name: 'interest' }, { name: 'locking' }, { name: 'planName' }, { name: 'date' }, { name: 'expireDate' }, { name: 'profit' }];
  
  rows: any;
  
  data = [];
  blockUserId : any;
  filteredData = [];
  page:Number = 1;
  count:any;
  limit:Number = 12;
  allInvestmentList
  formula: string = 'all investment';
  viewById:any;
  investmentByIdList:any;
  constructor(private userListService:userListService,private router:Router,private modalService: NgbModal, config: NgbModalConfig) { }

  ngOnInit(): void {
    this.AllInvestment();
  }

  
  setPage(event:any){
    this.page = event.offset+1;
    this.AllInvestment();
    }
 
    getlimit(event:any){
      this.limit = event.target.value;
      this.AllInvestment();
    }
 

  AllInvestment(){
    this.userListService.getAllInvestment(this.page,this.limit).subscribe((data:any) => {
      this.allInvestmentList = data.items?.docs;
      this.rows = data.items?.docs;
      this.count = data.items?.totalDocs;
      this.limit = data.items?.limit;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.data = this.allInvestmentList;
      this.filteredData = this.allInvestmentList;
    });
  }

    openviewModal(data:any, view:any){
      this.modalService.open(data,{
        centered:true,
        scrollable:true,
        size:'xl'
      });
      this.viewById = view.customId;
      
      
      // this.investmentById();
    }

  
  investment(row:any){
    this.router.navigate(["/dashboard/investmentById"], { state: { data:row } });
  }

  // get investment by customId
 
  filterUpdate(event: any) {
    let val = event.target.value.toLowerCase();
    let colsAmt = this.cols.length;
    let keys = Object.keys(this.allInvestmentList[0]);
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
      headers: ['ID', 'name', 'phone', 'amount', 'interest', 'locking', 'planName', 'date','expireDate', 'profit'],
    }



    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);
      this.AllInvestment();

    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);
      this.AllInvestment();
      this.exportCSVData = undefined;


    }
    
  }
  onActivate(event: any) {
    // console.log('Activate Event', event.type);
  }
}
