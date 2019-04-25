import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isLogged = true;

  @Output() eventClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  sendEvent() {
    this.eventClick.emit(this.isLogged);
  }

}
