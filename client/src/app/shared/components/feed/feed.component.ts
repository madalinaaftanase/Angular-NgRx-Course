import { Component, Input, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectIsLoading, selectfeedData } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink]
})

export class FeedComponent implements OnInit {
    @Input() apiUrl: string = ""
    private store = inject(Store);

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        feed: this.store.select(selectfeedData)
    })

    ngOnInit(): void {
        this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }))
    }
}