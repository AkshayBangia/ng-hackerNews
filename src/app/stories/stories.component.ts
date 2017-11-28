import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { HackerNewsAPIService } from '../hackernews-api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit {
  typeSub: any;
  pageSub: any;
  items;
  storiesType;
  pageNum: number;
  listStart: number;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute) {}

// Service "ActivatedRoute" allows to access information in the route
// Then hook fires when the component is initialized
// we subscribe to the route data property and store "storiesType" into a component variable
  ngOnInit() {
    this.typeSub = this.route
      .data
      .subscribe(data => this.storiesType = (data as any).storiesType);
    // New API doesn't load all top 500 stories
    // we need to add page number as an argument
    // starting with passing 'news' and page number 1
    this.pageSub = this.route.params.subscribe(params => {
      this.pageNum = params['page']? +params['page']: 1;
      this._hackerNewsAPIService.fetchStories(this.storiesType, this.pageNum)
        .subscribe(
          items => this.items = items,
          error => console.log('Error fetching' + this.storiesType + 'stories'),
          () => {this.listStart = ((this.pageNum - 1) * 30) + 1;
          window.scrollTo(0,0);
        });
    });
  }
}
