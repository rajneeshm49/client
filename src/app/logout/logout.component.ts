import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
        this._flashMessagesService.show('Successfully logged out!', { cssClass: 'alert-success'});
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
  }

}
