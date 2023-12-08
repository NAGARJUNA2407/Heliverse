// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public search$: Observable<string> = this.searchSubject.asObservable();

  private jsonDataUrl = 'assets/data.json'; // Update the URL to your JSON data

  constructor(private http: HttpClient) {}

  search(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonDataUrl);
  }
}
