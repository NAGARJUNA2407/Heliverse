import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  selectedTeamMembers: any[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  totalItems = 0;
  totalPages = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe((data) => {
      this.dataService.setData(data);

      this.updateDisplayedUsers();
    });

    this.dataService.filterApplied$.subscribe((updatedTotalItems) => {
      if (typeof updatedTotalItems === 'number') {
        this.totalItems = updatedTotalItems;
      }
      this.updateDisplayedUsers();

    });
  }

  updateDisplayedUsers() {
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    this.users = this.dataService
      .getDataArray()
      .slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (!this.isLastPage()) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  isLastPage(): boolean {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return this.currentPage === totalPages;
  }

  dataToSend: any[] = [];

  @Output() teamMembersUpdated = new EventEmitter<any[]>();

  sendData(user: any) {

    const userDomain = user['domain'] as string;


    const isUserAlreadyAdded = this.dataToSend.some(
      (existingUser) => existingUser['domain'] === userDomain
    );

    if (!isUserAlreadyAdded) {

      this.dataToSend.push(user);


      this.teamMembersUpdated.emit(this.dataToSend);
    } else {
      console.log(
        `User with domain ${userDomain} already exists in dataToSend. Skipping.`
      );
    }
  }
}
