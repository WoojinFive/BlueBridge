import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataStorageService } from '../../../shared/data-storage.service';
import { HomeService } from './../home.service';
import { UserService } from './../../../shared/user.service';

import { HomeFeed } from './home-feed.model';
import { User } from '../../../shared/user.model';

import { MatDialog } from '@angular/material/dialog';

import { HomeFeedEditComponent } from './home-feed-edit/home-feed-edit.component';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css'],
})
export class HomeFeedComponent implements OnInit, OnDestroy {
  users: User[];
  feeds: HomeFeed[];
  subscription: Subscription;
  subscriptionUser: Subscription;
  isOwnFeed: boolean;
  isLoading = true;
  isEditMode = true;

  currentUserData = JSON.parse(localStorage.getItem('userData'));

  constructor(
    private dataStorageService: DataStorageService,
    private homeService: HomeService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // fetch users
    this.dataStorageService.fetchUsers().subscribe();
    this.subscriptionUser = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;

        // fetch feeds after fetch users
        this.dataStorageService.fetchFeeds().subscribe();
        this.subscription = this.homeService.feedsChanged.subscribe(
          (feeds: HomeFeed[]) => {
            this.feeds = feeds;
            // this.isLoading = false;
            this.feeds = this.feeds.sort((a, b) => {
              // sort descending by date and high priority
              const date1 = new Date(a.date);
              const date2 = new Date(b.date);
              return (
                Number(b.isHighPriority) - Number(a.isHighPriority) ||
                date2.getTime() - date1.getTime()
              );
            });

            // add additional info in feeds data
            this.feeds = this.feeds.map((feed) => {
              const user = this.users.filter(
                (user) => user._id === feed.author
              );

              if (!user.length) return feed;
              const userName =
                user[0].personalInfo.firstName +
                ' ' +
                user[0].personalInfo.lastName;

              return {
                ...feed,
                authorName: userName ? userName : 'Temp User',
                avatar: user[0].personalInfo.picture,
                isLogin: user[0].isLogin,
              };
            });

            this.isLoading = false;
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }

  authCheck(feed) {
    this.isOwnFeed = feed.author == this.currentUserData.userID ? true : false;
    return this.isOwnFeed;
  }

  onFeedDelete(feed) {
    this.isLoading = true;
    // this.homeService.deleteFeed(feed._id);
    this.dataStorageService.deleteFeed(feed._id);
  }

  onUpdateFeed(feed) {
    this.dataStorageService.updateFeed(feed);
  }

  openDialog(feed): void {
    const dialogRef = this.dialog.open(HomeFeedEditComponent, {
      width: '50%',
      data: {
        description: feed.description,
        isHighPriority: feed.isHighPriority,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const date = new Date();
        const updateDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        ).toISOString();

        const updatedFeed = {
          _id: feed._id,
          author: feed.author,
          description: result.description,
          date: updateDate,
          isHighPriority: result.isHighPriority,
        };
        this.onUpdateFeed(updatedFeed);
      }
    });
  }
}
