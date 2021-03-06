import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstName: string;
  lastName: string;
  message: string;
 
  constructor(
    private dashboardService: DashboardService,
    private router: Router) {
    this.searches = [];
  }

  onSearchName() {
    console.log("search for name: " + this.firstName + "; last: " + this.lastName);
    if (this.firstName && this.lastName) {
      this.dashboardService.addToHistory(this.firstName, this.lastName);
      this.dashboardService.searchName(this.firstName, this.lastName)
      .subscribe(
        _ => {
          this.message = "valid";
        },
        err => {
          this.message = err.message;
        }
      );
    }
    else {
      this.message = "Provide first and last name for search";
    }

    return false;
  }

  AddUser() {
    console.log("first: " + this.firstName + "; last: " + this.lastName);
    if (this.firstName || this.lastName) {
      this.dashboardService.addflName(this.firstName, this.lastName)
          .then(() => {
            console.log("first and last name added");
            this.message = "";
            if (this.firstName) {
            this.message = "provide last name for search."
            }
            if (this.lastName) {
              this.message = "provide  first name for search."
            }
            this.message = this.firstName + " " + this.lastName + " added.";
            this.firstName = "";
            this.lastName = "";
          })
      
    }
    else {
      this.message = "provide first and last name for search."
    }
    return false;
  }

  searchHistory() {
    this.dashboardService.getHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  ngOnInit() {
  }

}
