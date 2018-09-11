import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrls: ['./admin-logout.component.scss']
})
export class AdminLogoutComponent implements OnInit {

  constructor(private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this._flashMessagesService.show('Successfully Logged out!', { cssClass: 'alert-success'});
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    this.router.navigate(['/admin/login']);
  }

}
