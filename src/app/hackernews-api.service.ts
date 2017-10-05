import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HackernewsApiService {
  baseUrl: string;

  constructor(private http:Http) {
    this.baseUrl = 'http://hacker-news.firebaseio.com/v0';
  }

// http.get call returns an Observable of data
// Taking the observable and then mapping it to json format
  fetchStories(): Observable < any > {
    return this.http.get(`${this.baseUrl}/topstories.json`)
      .map(response => response.json());
  }

// Second Observable subscription for each item to show their details
  fetchItem(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/item/${id}.json`)
      .map(response => response.json());
  }

}
