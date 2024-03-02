import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLinkActive } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { combineLatest, filter, map, Observable, tap } from 'rxjs'
import { ArticleFormComponent } from '../../shared/components/articleForm/articleForm.component'
import { LoadingComponent } from '../../shared/components/loading/loading.component'
import { ArticleFormValuesInterface } from '../../shared/components/articleForm/types/articleFormValues.interface'
import { selectArticle, selectIsLoading, selectIsSubmitting, selectValidationErrors } from '../store/reducers'
import { ArticleInterface } from '../../shared/types/articles.interface'
import { editArticleActions } from '../store/actions'
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface'


@Component({
    selector: 'app-edit-article',
    templateUrl: './editArticle.component.html',
    standalone: true,
    imports: [ArticleFormComponent, CommonModule, LoadingComponent, RouterLinkActive],
})
export class EditArticleComponent implements OnInit {
    initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
        select(selectArticle),
        filter((article): article is ArticleInterface => article !== null),
        map((article: ArticleInterface) => {
            return {
                title: article?.title,
                description: article?.description,
                body: article?.body,
                tagList: article?.tagList,
            }
        })
    )
    slug = this.route.snapshot.paramMap.get('slug') ?? ''
    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors),
        isLoading: this.store.select(selectIsLoading),
        initialValues: this.initialValues$,
    })

    constructor(private store: Store, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.store.dispatch(
            editArticleActions.getArticle({ slug: this.slug })
        )
    }

    onSubmit(articleFormValues: ArticleFormValuesInterface): void {
        const request: ArticleRequestInterface = {
            article: articleFormValues,
        }
        this.store.dispatch(
            editArticleActions.updateArticle({ request, slug: this.slug })
        )
    }
}
