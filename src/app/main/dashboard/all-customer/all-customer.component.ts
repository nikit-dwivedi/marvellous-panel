import { Component, OnInit, ViewChild } from "@angular/core";
import { ColumnMode, DatatableComponent, SelectionType } from "@swimlane/ngx-datatable";
import { ngxCsv } from "ngx-csv/ngx-csv";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { userListService } from "app/services/user-list-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-all-customer",
  templateUrl: "./all-customer.component.html",
  styleUrls: ["./all-customer.component.scss"],
})
export class AllCustomerComponent implements OnInit {
  private tempData = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private exportCSVData: [] | any;

  @ViewChild(DatatableComponent) table: DatatableComponent | any;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  cols = [{ name: "name" }, { name: "phone" }, { name: "email" }, { name: "city" }, { name: "occupation" }, { name: "invested" }, { name: "kycStatus" }];
  rows: any;
  data = [];
  blockUserId: any;
  filteredData = [];
  formula: string = "all customer";
  transaction: any;
  count: any;
  page: any = 1;
  customerList: any;

  constructor(private userListService: userListService, private modalService: NgbModal, config: NgbModalConfig, private router: Router) {}

  ngOnInit(): void {
    this.kycReport();
  }

  kycReport() {
    this.userListService.getReport().subscribe((data: any) => {
      console.log(data.items[0]);

      this.customerList = data.items;
      this.rows = data.items;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.data = this.customerList;
      this.filteredData = this.customerList;
    });
  }

  viewDetails(row: any) {
    console.log(row);
    this.router.navigate(["/dashboard/customerDetails"], { state: { data: row } });
  }

  viewInvestment(row: any) {
    this.router.navigate(["/dashboard/investmentById"], { state: { data: row } });
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name?.toLowerCase().indexOf(val) !== -1 || d.phone?.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
  }
  onSelect({ selected }: any) {
    this.exportCSVData = selected;
    // this.selected.splice(0, this.selected.length);
    //this.selected.push(...selected);
  }
  downloadCSV(event: any) {
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: false,
      showTitle: false,
      title: "",
      useBom: false,
      noDownload: false,
      headers: ['ID', 'customerId', 'Full Name', 'Phone','Email', 'City', 'Occupation' ,'Profile Image','Bank Name','Account Number','IFSC','Kyc Status','Invested']
      // header: [
      //   { label: "Account Number", key: "accountNumber" },
      //   { label: "Bank Name", key: "bankName" },
      //   { label: "City", key: "city" },
      //   { label: "customerId", key: "customerId" },
      //   { label: "Email", key: "email" },
      //   { label: "IFSC", key: "ifsc" },
      //   { label: "Invested", key: "invested" },
      //   { label: "Kyc Status", key: "kycStatus" },
      //   { label: "Full Name", key: "name" },
      //   { label: "Occupation", key: "occupation" },
      //   { label: "Phone", key: "phone" },
      //   { label: "Profile Image", key: "profileImage" },
      //   { label: "ID", key: "userId" },
      // ],
    };
    if (this.exportCSVData == undefined) {
      const fileInfo = new ngxCsv(this.tempData, this.formula, options);
      // this.AllTransaction();
    } else {
      const fileInfo = new ngxCsv(this.exportCSVData, this.formula, options);

      // this.AllTransaction();
      this.exportCSVData = undefined;
    }
    // event.selected = [];
    // this.selected = [];
  }
  onActivate(event: any) {
    // console.log('Activate Event', event.type);
  }
}
