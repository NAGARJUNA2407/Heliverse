import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data.json';
  private originalData: any[] = [];
  private filteredData: any[] = [];
  private searchData: any[] = [];

  constructor(private http: HttpClient) {}

  private filteredDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  filteredData$: Observable<any[]> = this.filteredDataSubject.asObservable();

  private filterAppliedSubject: BehaviorSubject<number | boolean> =
    new BehaviorSubject<number | boolean>(false);
  filterApplied$: Observable<number | boolean> =
    this.filterAppliedSubject.asObservable();

  notifyFilterApplied() {
    this.filterAppliedSubject.next(true);
  }

  applyFilters(filters: any): void {
    this.filteredData = this.originalData.filter((item) => {
      return (
        (filters.domain === 'none' || item.domain === filters.domain) &&
        (filters.gender === 'none' || item.gender === filters.gender) &&
        (filters.available === 'none' ||
          item.available.toString() === filters.available)
      );
    });

    this.filteredDataSubject.next(this.filteredData);
  }

  hasSearchedData(): boolean {
    return this.searchData.length > 0;
  }
  hasFilteredData(): boolean {
    return this.filteredData.length > 0;
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getTotalItems(): number {
    return this.originalData.length;
  }

  getDataArray(): any[] {
    return this.hasSearchedData()
      ? this.searchData
      : this.hasFilteredData()
      ? this.filteredData
      : this.originalData;
  }

  setData(data: any[]): void {
    this.originalData = data;
    this.filteredDataSubject.next(data);
  }

  searchByName(name: string): void {
    this.http.get<any[]>(this.dataUrl).subscribe(
      (data) => {
        const searchTerm = name.toLowerCase();

        // Search in the original data
        const searchData = data.filter(
          (item) =>
            item.first_name.toLowerCase().includes(searchTerm) ||
            item.last_name.toLowerCase().includes(searchTerm) ||
            `${item.first_name} ${item.last_name}`
              .toLowerCase()
              .includes(searchTerm)
        );


        this.originalData = searchData.length > 0 ? searchData : data;


        const filteredSearchData = this.filteredData.filter(
          (item) =>
            item.first_name.toLowerCase().includes(searchTerm) ||
            item.last_name.toLowerCase().includes(searchTerm) ||
            `${item.first_name} ${item.last_name}`
              .toLowerCase()
              .includes(searchTerm)
        );


        this.filteredData =
          filteredSearchData.length > 0
            ? filteredSearchData
            : this.filteredData;

         
        this.filteredDataSubject.next(this.filteredData);
      },
      (error) => {
        console.error('Error during search:', error);
      }
    );
  }
}
