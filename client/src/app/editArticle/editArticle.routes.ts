import { Route } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import { EditArticleService } from './services/editArticle.service'
import * as editArticleEffects from './store/effects'
import { editArticleFeatureKey, editArticleReducer } from './store/reducers'
import { EditArticleComponent } from './components/editArticle.component'

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
      EditArticleService
    ],
  },
]
