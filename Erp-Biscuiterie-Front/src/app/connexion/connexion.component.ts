import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.css"]
})
export class ConnexionComponent implements OnInit {
  constructor(private router: Router) {}

  username: string;
  password: string;

  ngOnInit() {}

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate([""]);
    } else {
      alert("nom ou mot de passe incorrect");
    }
  }
}







