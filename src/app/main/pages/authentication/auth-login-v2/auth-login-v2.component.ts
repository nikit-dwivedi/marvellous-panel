import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { userListService } from 'app/services/user-list-service';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: UntypedFormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  private username=""
  private pass = ""

  // Private
  private _unsubscribeAll: Subject<any>;
  userState: any;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService, private router: Router, private userListService: userListService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

 

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

 

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

   // convenience getter for easy access to form fields
   get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    else {
      let body: any = {
        // "email": this.loginForm.value.email,
        // "passWord": this.loginForm.value.passWord

        "adminId": "1"
      }
      if (this.loginForm.value.username!==this.username ||this.loginForm.value.password!==this.pass) {
        this.toastr.error("Invalid username or password");
        return
      }
      this.userListService.login(body).subscribe((res: any) => {

        if (res.status == true) {
          localStorage.setItem('token', JSON.stringify(res.items))
          JSON.parse(localStorage.getItem('token') || '{}')
          this.toastr.success(res.message);
          this.loginForm.reset();
          this.submitted = false;
          this._router.navigate(["/dashboard/home"], { state: { data: res.items } });
          
        }
        else {
          // console.log(this._router.navigate);
          this.toastr.error(res.message);
          this.loginForm.reset();
        }
      })

    }

  }
 
/**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
