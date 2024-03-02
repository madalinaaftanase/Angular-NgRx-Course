import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "../types/articles.interface";
import { environment } from "../../../environments/environment";
import { ArticleResponseInterface } from "../types/articleResponse.interface";

@Injectable({
    providedIn: 'root'
})

export class ArticleService {
    private httpClient = inject(HttpClient)

    getArticle(slug: string): Observable<ArticleInterface> {
        console.log("get me")
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;

        return this.httpClient.get<ArticleResponseInterface>(fullUrl).pipe(map((response) => response.article));
    }

    deleteArticle(slug:string){
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.httpClient.delete(fullUrl);
    }
}