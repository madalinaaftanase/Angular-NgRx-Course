import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, filter, map } from "rxjs";
import { selectArticleData, selectError, selectIsLoading } from "../store/reducers";
import { articleActions } from "../store/actions";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { selectCurrentUser } from "../../auth/store/reducers";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorMessageComponent } from "../../shared/components/errorMessage/errorMessage.component";
import { TagListComponent } from "../../shared/components/tagList/tagList.component";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent, TagListComponent]
})

export class ArticleComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    slug = this.route.snapshot.paramMap.get('slug') ?? ''
    isAuthor$ = combineLatest({
        article: this.store.select(selectArticleData),
        currentUser: this.store.select(selectCurrentUser).pipe(filter((currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined))
    }).pipe(map(({ article, currentUser }) => {
        if (!article || !currentUser) {
            return false;
        }
        return article.author.username === currentUser.username
    }))

    data$ = combineLatest({
        article: this.store.select(selectArticleData),
        error: this.store.select(selectError),
        isLoading: this.store.select(selectIsLoading),
        isAuthor: this.isAuthor$

    })
    ngOnInit(): void {
        this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
    }

    deleteArticle(): void {
        this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
    }

}