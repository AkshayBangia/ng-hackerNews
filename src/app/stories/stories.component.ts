import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {HackernewsApiService} from '../hackernews-api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit {
  items;

  constructor(private _hackerNewsAPIService: HackernewsApiService) {}

// Hook fires when the component is initialized
// we subscribe to the data stream and set the items attribute to what gets returned
  ngOnInit() {
  this._hackerNewsAPIService.fetchStories()
      .subscribe(
        items => this.items = items,
        error => console.log('Error fetching stories')
      );
  }

}
