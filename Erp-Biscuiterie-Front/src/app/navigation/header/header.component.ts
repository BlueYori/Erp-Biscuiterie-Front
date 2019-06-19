import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConnexionService } from 'src/app/service/connexion/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private connexionService: ConnexionService) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.connexionService.logout();
    window.location.href = '/';
  }

}
