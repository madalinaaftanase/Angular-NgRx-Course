import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { addToFavoritesActions } from './actions'
import { AddToFavoriteService } from '../services/addToFavorites.service'
import { ArticleInterface } from '../../../types/articles.interface'

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoriteService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeFromFavorites(slug)
          : addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article })
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure())
          })
        )
      })
    )
  },
  { functional: true }
)
