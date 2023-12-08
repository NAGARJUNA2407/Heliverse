import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FilterComponent } from '../filter/filter.component';

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
    console.log(this.first_name);
  }
}
