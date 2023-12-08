import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
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
      console.log('home kadata ', data);

      // if (!this.dataService.hasFilteredData()) {
      //   this.totalItems = this.dataService.getTotalItems();
      // }

      this.updateDisplayedUsers();
    });

    this.dataService.filterApplied$.subscribe((updatedTotalItems) => {
      if (typeof updatedTotalItems === 'number') {
        this.totalItems = updatedTotalItems;
      }
      this.updateDisplayedUsers();
      // Call
      //  the new method to update total pages
    });
  }

  updateDisplayedUsers() {
    console.log('calling this');
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
}
