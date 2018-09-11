import { Component, OnInit } from '@angular/core';
import { LoginModel} from '../../models/login.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  errorMsg = '';
  user: LoginModel = new LoginModel();
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]]
    })
  }

  onLoginSubmit() {
    this.userService.adminLogin(this.user).subscribe(
      res => {
        if(res.success === true) {
              localStorage.setItem('admin_token', res.data.token);
              localStorage.setItem('admin_user', res.data.name);
              this.router.navigate(['/admin']);
              this._flashMessagesService.show('Successful Login!', { cssClass: 'alert-success'});
          } else {
              this._flashMessagesService.show(res.message, { cssClass: 'alert-danger'});
          }
          
      }
  );
  }

}
