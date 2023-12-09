import { Component } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  filteredData: any[] = [];
  selectedDomain: string = '';
  selectedGender: string = '';
  selectedAvailability: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe((data) => {
      this.dataService.setData(data);
      // console.log('filter mein', this.dataService.getDataArray());
    });
  }

  applyFilter() {
    console.log('in apply filter');
    const filters = {
      domain: this.selectedDomain,
      gender: this.selectedGender,
      available: this.selectedAvailability,
    };

    // console.log(filters);

    this.dataService.applyFilters(filters); // Use the applyFilters method in DataService

    console.log(this.dataService.getDataArray());
    this.dataService.notifyFilterApplied();
  }
}
