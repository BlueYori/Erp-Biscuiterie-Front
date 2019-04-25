import { Component } from '@angular/core';
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Erp-Biscuiterie-Front';

  isLoggedIn = false;

  receiveEvent($event) {
    this.isLoggedIn = $event;
    console.log(this.isLoggedIn);
  }
}
