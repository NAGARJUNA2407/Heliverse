import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private dataService: DataService) {}

  search() {
    this.dataService.searchByName(this.searchTerm).subscribe((results) => {
      this.searchResults = results;
      console.log(this.searchResults);

    });
  }
}
