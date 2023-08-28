import { Component, OnInit } from '@angular/core';
import { userListService } from 'app/services/user-list-service';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  investment:any;
  countList:any;
  investmentAmount:any;
  constructor(private userListService:userListService) { }
  public contentHeader: object
  ngOnInit(): void {
    this.totalInvestment();
    this.allCount();
    
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: 'dashboard/home'
          }
        ]
      }
    }
  }

  // get total investment
  totalInvestment(){
    this.userListService.getTotalInvestment().subscribe((data:any) => {
      this.investmentAmount = data.items;
    })
  }
// Get all count
allCount(){
  this.userListService.getCount().subscribe((data:any) => {
    this.countList = data.items
   
  })
}

}
