import { Component } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './globalFeed.component.html',
})
export class GlobalFeedComponent {
  apiUrl = '/articles'
}
