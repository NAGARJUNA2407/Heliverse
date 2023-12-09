import { Component } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchTerm: string = '';
  first_name = '';
  searchResults: any[] = [];

  constructor(private dataService: DataService) {}
  getName() {
    this.first_name = this.searchTerm;
  }

  search() {
    this.dataService.searchByName(this.searchTerm);
    this.dataService.notifyFilterApplied();
  }
}
