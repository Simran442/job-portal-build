import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {
  currentUser;
  constructor() { }

  ngOnInit(): void {
   var userDetail = localStorage.getItem('currentUser');
   this.currentUser = JSON.parse(userDetail)
  }

}
