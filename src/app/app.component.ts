import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { LogInService } from './services/log-in.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from './Model/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Task Management';

  isUserLoggedIn: boolean = false; 
  user?: User | null;
  userEmail?: string | null;
  private userSubject!: Subscription;

  constructor( private loginService : LogInService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus(event.url);
      }
    });

    this.userSubject = this.loginService.user.subscribe((user) => {
      console.log("User changed:", user);
      this.user = user;
      this.isUserLoggedIn = !!user;
      this.userEmail = user ? user.email : null;
      this.cdr.detectChanges();
    });


    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.user = parsedUser;
      this.isUserLoggedIn = true;
      this.userEmail = parsedUser.email || '';
      this.loginService.user.next(parsedUser);
    } 
  }
  
  ngOnDestroy() {
    this.userSubject.unsubscribe(); 
  }

  logOut() {
    console.log('Logging out...');
    this.loginService.logOut(); 
    this.isUserLoggedIn = false;
    this.user = null;
      this.router.navigate(['/home']);
  }

  updateLoginStatus(url: string) {
    const storedUser = localStorage.getItem('userData');
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.isUserLoggedIn = true;
      this.userEmail = parsedUser.email;
    } else {
      this.isUserLoggedIn = false;
      this.userEmail = null;
    }
  }
}
