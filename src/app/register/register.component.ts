import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
 
  constructor(private userService: UserService, private router: Router,
     private formBuilder: FormBuilder, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name': [this.user.name, [
        Validators.required
      ]],
      'mobile': [this.user.mobile, [
        Validators.required
      ]],
      'address': [this.user.address, [
        Validators.required
      ]],
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

  onRegisterSubmit():void {
    this.userService.register(this.user).subscribe(res => {
      if(res.success === false) {
        this._flashMessagesService.show('Error! User coudnt be registered', { cssClass: 'alert-danger'});
      } else {
        this._flashMessagesService.show('User successfully registered!', { cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      }
    });
  }
}
