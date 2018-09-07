import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from './core/services/config.service';
import { map, mergeAll } from 'rxjs/operators';
import { LinkModel } from './shared/models/Link';
import { ConfigModel } from './shared/models/config';

// import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  title: string;
  links: LinkModel[] = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    const subscription = this.configService.getConfig().subscribe((data: ConfigModel) => {
     this.title = data.title;
      });
    this.configService.getConfig()
      .pipe(
        map((data: any) => data.links),
        mergeAll(),
        map((link: LinkModel) => {
          this.links.push(link);
        })
      )
      .subscribe();

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.map(subscribe => subscribe.unsubscribe());
  }
}
