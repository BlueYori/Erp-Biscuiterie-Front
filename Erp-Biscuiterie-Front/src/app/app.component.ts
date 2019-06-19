import { Component, OnInit } from '@angular/core';
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Erp-Biscuiterie-Front';

  isLoggedIn = false;

  ngOnInit() {
    const ls = localStorage.getItem('logged');

    if (ls === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  receiveEvent($event) {
    this.isLoggedIn = $event;
    // console.log(this.isLoggedIn);
  }
}
