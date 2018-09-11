import { Component, DoCheck } from '@angular/core';
import { environment } from '../../../environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss']
})
export class AdminNavBarComponent implements DoCheck {

  private isAdminLoggedIn;
  private admin_name;
  private message;
  private url = environment.url;
  private cartCount;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngDoCheck() {
    if(localStorage.getItem('admin_token')) {
      this.isAdminLoggedIn = true;
      this.admin_name = localStorage.getItem('admin_user');
    } else {
        this.isAdminLoggedIn = false;
    }
  }

  logoutDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to logout?", button2msg: "Logout"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.router.navigate(['/admin/logout']);
      }
    });
  }

}
