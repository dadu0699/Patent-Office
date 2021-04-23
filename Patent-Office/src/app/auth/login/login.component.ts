import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: string;
  public pass: string;

  constructor(private _router: Router) {
    this.user = '';
    this.pass = '';
  }

  ngOnInit(): void { }

  public signin(): void {
    if ((this.user && this.pass) === 'admin') {
      localStorage.setItem('user', JSON.stringify(this.user));
      this._router.navigate(['/dashboard']);
    }
  }
}
