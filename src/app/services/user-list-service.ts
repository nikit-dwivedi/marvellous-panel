import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { listenerCount } from "process";

@Injectable({
  providedIn: "root",
})
export class userListService {
  private apiUrl = environment.apiUrl;
  private pdfUrl = environment.pdfUrl;

  userInfo: any;
  adminToken: any;

  constructor(private http: HttpClient) {
    this.adminToken = localStorage.getItem("token");
  }

  Header = () => {
    let headers = new HttpHeaders();
    headers = headers.append("content-type", "application/json");
    headers = headers.append("Accept", "application/json");
    headers = headers.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem("token")) || "{}"} `);
    return { headers };
  };

  // login
  login(body: any) {
    return this.http.post<any>(this.apiUrl + "/admin/login", body).pipe(
      map((user: any) => {
        let tokenstring = user.items;

        localStorage.setItem("token", tokenstring);
        return user;
      })
    );
  }
  // get all investment
  getAllInvestment(page: any, limit: any) {
    return this.http.get(this.apiUrl + `/admin/investments?page=${page}&limit=${limit}`, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get investment by id
  getInvestById(customId: any) {
    return this.http.get(this.apiUrl + "/admin/investment/" + customId, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get all customer
  getAllCustomer() {
    return this.http.get(this.apiUrl + "/admin/allCustomers", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get customer by Id
  getCustomerById(customerId:any) {
    return this.http.get(this.apiUrl + "/admin/customer/" + customerId, this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // get customer balanc by id
  getBalanceByCid(customerId: any) {
    return this.http.get(this.apiUrl + "/admin/getBalanceUser/" + customerId, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get kyc by customId
  getKycByCid(customerId: any) {
    return this.http.get(this.apiUrl + "/admin/getKyc/" + customerId, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get bank by id
  getbankById(customerId: any) {
    return this.http.get(this.apiUrl + "/admin/bank/details/" + customerId, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }
  // get total investment
  getTotalInvestment() {
    return this.http.get(this.apiUrl + "/admin/partnershipAmount", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get kyc list
  getkycList(body: any) {
    return this.http.post(this.apiUrl + "/admin/getAllKyc", body, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // verify kyc by id
  verifyKycById(customerId: any, body: any) {
    return this.http.post(this.apiUrl + "/admin/editKycVerified/" + customerId, body, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // get all settelment
  getAllSettelment(status: any) {
    return this.http.get(this.apiUrl + `/admin/allSettlements?status=${status}`, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // Total count
  getCount() {
    return this.http.get(this.apiUrl + "/admin/getAllCounts", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // get kyc report
  getReport() {
    return this.http.get(this.apiUrl + "/admin/investment/kyc/report", this.Header()).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // creat new investment
  creatNewInvestment(body: any, customId: any) {
    return this.http.post(this.apiUrl + "/admin/create/investment/" + customId, body, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // edit investment by investment Id
  editInvestment(investmentId: any, body: any) {
    return this.http.post(this.apiUrl + "/admin/edit/investment/" + investmentId, body, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // creat settelment
  createSettelment() {
    return this.http.get(this.apiUrl + "/admin/settlement", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }
   // creat settelment
   settleAllProcessing() {
    return this.http.get(this.apiUrl + "/admin/settled", this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }
  // changes settelment status by _Id
  chnageSettelmentStatus(_id: any) {
    return this.http.get(this.apiUrl + "/admin/settledById/" + _id, this.Header()).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  // download certificate
  downloadReceipt(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append("content-type", "application/json");
    headers = headers.append("Accept", "application/json");
    headers = headers.append("X-API-KEY", `edccNDU0MToxNTUyOnF4cUF4UElFejJCOFZxbjk`);
    return this.http.post(this.pdfUrl, body,{headers}).pipe(
      map((list: any) => {
        return list;
      })
    );
  }
}
