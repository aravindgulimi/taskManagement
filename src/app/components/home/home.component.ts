import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title : string = 'Welcome to the Task Management Application!';

  heading : string = `Easily manage your day-to-day tasks and activities all in one place. Stay
                      organized, boost productivity, and never miss a deadline!`;

  sub_header : string = 'With this application, you can:';     
  
  header1 : string[] = ['Create, view, edit, and delete tasks effortlessly', 'Set reminders to stay on top of deadlines',
    'Prioritize tasks based on urgency and importance', 'Keep track of all your activities in an organized manner'
  ];

  isUserLoggedIn: boolean = false;

  constructor(private route : Router, private loginService : LogInService){}

  ngOnInit() {
    this.loginService.user.subscribe((user) => {
      this.isUserLoggedIn = !!user;
    });
  }

  login(){
    if (!this.isUserLoggedIn) {
      this.route.navigate(['/login']);
    }
  }

  signUp(){
    if (!this.isUserLoggedIn) {
      this.route.navigate(['/registration']);
    }
  }

}
