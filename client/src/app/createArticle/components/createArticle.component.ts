import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ArticleFormComponent } from "../../shared/components/articleForm/articleForm.component";
import { ArticleInterface } from "../../shared/types/articles.interface";
import { ArticleFormValuesInterface } from "../../shared/components/articleForm/types/articleFormValues.interface";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectIsSubmitting, selectValidationErrors } from "../store/reducers";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { createArticleActions } from "../store/actions";

@Component({
    selector: 'app-create-article',
    templateUrl: './createArticle.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, ArticleFormComponent]
})

export class CreateArticleComponent implements OnInit {
    private store = inject(Store);
    
    initialValues ={
        title:'',
        description:'',
        body:'',
        tagList: []
    }

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        errors: this.store.select(selectValidationErrors)
    })

    ngOnInit(): void {

    }

    onSubmit(articleFormValues: ArticleFormValuesInterface){
            const request: ArticleRequestInterface={
                article: articleFormValues
            }

            this.store.dispatch(createArticleActions.createArticle({request}))
    }
}


