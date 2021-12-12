import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-sign-bar',
  templateUrl: './log-sign-bar.component.html',
  styleUrls: ['./log-sign-bar.component.css']
})
export class LogSignBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }

}
