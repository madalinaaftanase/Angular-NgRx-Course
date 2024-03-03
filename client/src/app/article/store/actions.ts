import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { ArticleInterface } from "../../shared/types/articles.interface";

export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Get article': props<{ slug: string }>(),
        'Get article Success': props<{ article: ArticleInterface }>(),
        'Get article Failure': emptyProps(),

        'Delete article': props<{ slug: string }>(),
        'Delete article Success': emptyProps(),
        'Delete article Failure': emptyProps()
    }
    
})