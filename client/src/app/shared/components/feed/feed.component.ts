import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectIsLoading, selectfeedData } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { LoadingComponent } from "../loading/loading.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { query } from "express";
import queryString from "query-string";
import { TagListComponent } from "../tagList/tagList.component";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, LoadingComponent, PaginationComponent, ErrorMessageComponent, TagListComponent]
})

export class FeedComponent implements OnInit, OnChanges {
    private store = inject(Store);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    limit = environment.limit;
    baseUrl = this.router.url.split('?')[0];
    currentPage: number = 0;
    @Input() apiUrl: string = ""

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        feed: this.store.select(selectfeedData)
    })

    ngOnInit(): void {
        //unsubscribe itself
        this.route.queryParams.subscribe((params: Params) => {
            this.currentPage = Number(params["page"]) || 1;
            this.fetchFeed();
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
       const isApiUrlChanged = !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue !==  changes['apiUrl'].previousValue

       if(isApiUrlChanged){
        this.fetchFeed();
       }
    }

    fetchFeed(): void {
        const offset = this.currentPage * this.limit - this.limit;
        const parsedUrl = queryString.parseUrl(this.apiUrl);
        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query
        });
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
        this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }))
    }
}