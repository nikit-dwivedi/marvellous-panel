import { Component, OnInit } from '@angular/core';
import { userListService } from 'app/services/user-list-service';
import { Router, Navigation } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrserviceService } from 'app/services/toastrservice.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customId:any;
  balanceList:any;
  kycList:any;
  adharFront: any;
  adharBack: any;
  panFront:any;
  bankDetails: any;
  adminToken: any;
  selfie:any;
  constructor(private userListService:userListService,private router:Router, private toastr: ToastrserviceService,private modalService: NgbModal, config: NgbModalConfig){
    
    let nav:Navigation = this.router.getCurrentNavigation();
    if(!nav.extras.state || !nav.extras.state.data){
      this.router.navigate(["dashboard/allCustomer"])
    }
    this.customId = nav.extras.state.data.customerId  || nav.extras.state.data.customId;
    console.log("this.customId==================>",this.customId);
   }

  ngOnInit(): void {
    this.customerBalanceById();
    this.customerKycById();
    this.bankDetailsById();
  }

  // get balance by id 
  customerBalanceById(){
    this.userListService.getBalanceByCid(this.customId).subscribe((data:any) => {
      this.balanceList = data.items;
     })
  }

  // get kyc by id
  customerKycById(){
    this.userListService.getKycByCid(this.customId).subscribe((data:any) => {
      this.kycList = data.items;
      console.log("this.kycList",this.kycList);
      
    })
  }

  // get bank by id
  bankDetailsById(){
    this.userListService.getbankById(this.customId).subscribe((data:any) => {
      this.bankDetails = data.items;
    })
  }

  // view adhar front modal
  viewAdharFrontModal(data:any,kycList:any){
    this.customerKycById();
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
   this.adharFront = kycList.aadhaarFront;
   

  }

  // view adhar back modal
  viewAdharBackModal(data:any,kycList:any){
    this.customerKycById();
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    this.adharBack = kycList.aadhaarBack;
  }

  // view pan card modal
  viewPanModal(data:any,kycList:any){
    this.customerKycById();
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    this.panFront = kycList.panFront;
  }

  // view selfie modal
  viewSelfieModal(data:any,kycList:any){
    this.customerKycById();
    this.modalService.open(data,{
      centered:true,
      scrollable:true,
      size:'lg'
    });
    this.selfie = kycList.selfie;
  }
  // verify kyc by id
  verifyKyc(){
    const body = {
      "isVerified":true
    }
   
    this.userListService.verifyKycById(this.customId,body).subscribe((data:any) => {
      if(data.status == true){
        this.toastr.showSuccess(data.message,"Success!")
      }
      else{
        this.toastr.showError(data.message,"error!")
      }
    })
  }
}
