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

    });
  }

  applyFilter() {
    
    const filters = {
      domain: this.selectedDomain,
      gender: this.selectedGender,
      available: this.selectedAvailability,
    };

    this.dataService.applyFilters(filters);

    console.log(this.dataService.getDataArray());
    this.dataService.notifyFilterApplied();
  }
}
