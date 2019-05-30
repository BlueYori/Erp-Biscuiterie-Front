import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Connexion } from '../service/connexion/connexion';
import { ConnexionService } from '../service/connexion/connexion.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isLoginError = false;

  @Output() eventClick = new EventEmitter<boolean>();

  constructor(private router: Router, private connexionService: ConnexionService) {}

  connexion : Connexion;
  username  : string;
  password  : string;
  user      : Object;

  ngOnInit() {
  }

  sendEvent() {
    //this.eventClick.emit(this.isLogged);
    this.connexionService.login(this.username,this.password)
    .subscribe((user : Object ) => {
      if(user != null){
        this.isLoginError = false;
        this.user = user;
        this.eventClick.emit(!this.isLoginError);
      }},
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
      });
    };
    /*.subscribe(
      data =>
        {
          //this.connexion = data; 
          alert(data);
          //this.connexionService. = this.connexion.Email;  
          //navigare da qualche parte
        }
    );*/
  }


