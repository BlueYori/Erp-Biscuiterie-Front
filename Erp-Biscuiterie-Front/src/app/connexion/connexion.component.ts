import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  constructor(private router: Router) { }
username: string;
password: string;
  ngOnInit() {
  }
  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["user"]);
    }else {
      alert("Invalid credentials");
    }
  }
}
