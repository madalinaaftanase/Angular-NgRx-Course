import { Routes } from '@angular/router';
import { EditArticleComponent } from './editArticle/components/editArticle.component';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/globalFeed/globalFeed.routes').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () => import('../app/yourFeed/yourFeed.routes').then((m) => m.routes)
  },
  {
    path: 'tags/:slug',
    loadChildren: () => import('../app/tagFeed/tagFeed.routes').then((m) => m.routes)
  },
  {
    path: 'articles/new',
    loadChildren: () => import('../app/createArticle/createArticle.routes').then((m) => m.routes)
  },
  {
    path: 'articles/:slug',
    loadChildren: () => import('../app/article/article.routes').then((m) => m.routes)
  },
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  },
  // {
  //   path: 'articles/:slug/edit',
  //   loadChildren: () => import('../app/editArticle/editArticle.routes').then((m) => m.routes)
  // },
  {
    path: 'settings',
    loadChildren: () => import('../app/settings/settings.routes').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/'
  }

];
