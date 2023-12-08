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

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getTotalItems(): number {
    return this.originalData.length;
  }

  getDataArray(): any[] {
    return this.hasFilteredData() ? this.filteredData : this.originalData;
  }

  setData(data: any[]): void {
    this.originalData = data;
    this.filteredDataSubject.next(data);
  }

}
