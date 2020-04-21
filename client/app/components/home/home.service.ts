import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { HomeFeed } from './home-feed/home-feed.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  feedsChanged = new Subject<HomeFeed[]>();
  private feeds: HomeFeed[] = [];

  setFeeds(feeds: HomeFeed[]) {
    this.feeds = feeds;
    this.feedsChanged.next(this.feeds.slice());
  }

  getFeeds() {
    return this.feeds.slice();
  }

  addFeed(feed: HomeFeed) {
    this.feeds.push(feed);
    this.feedsChanged.next(this.feeds.slice());
  }

  deleteFeed(id: string) {
    console.log(id);
    this.feeds = this.feeds.filter((feed) => feed._id !== id);
    this.feedsChanged.next(this.feeds.slice());
    // this.recipes.splice(index, 1);
    // this.recipesChanged.next(this.recipes.slice());
  }
}
