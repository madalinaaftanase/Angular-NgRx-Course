import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "../../shared/types/articles.interface";
import { ArticleResponseInterface } from "../../shared/types/articleResponse.interface";

@Injectable({
    providedIn: 'root'
})

export class EditArticleService {
    private httpClient = inject(HttpClient)

    editArticle(articleRequest: ArticleRequestInterface, slug: string): Observable<ArticleInterface> {
        const finalUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.httpClient.put<ArticleResponseInterface>(finalUrl, articleRequest).pipe(map((response) => response.article));
    }
}