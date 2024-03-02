import { createActionGroup, props } from "@ngrx/store";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { ArticleInterface } from "../../shared/types/articles.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export const createArticleActions = createActionGroup({
    source: 'createArticle',
    events: {
        'Create article': props<{ request: ArticleRequestInterface }>(),
        'Create article Success ': props<{ article: ArticleInterface }>(),
        'Create article Failure': props<{ errors: BackendErrorsInterface }>(),
    }
})