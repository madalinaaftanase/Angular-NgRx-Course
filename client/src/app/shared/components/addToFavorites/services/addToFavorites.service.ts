import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "../../../types/articles.interface";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ArticleResponseInterface } from "../../../types/articleResponse.interface";

@Injectable()
export class AddToFavoriteService{
    private httpClient =inject(HttpClient);

    addToFavorites(slug:string): Observable<ArticleInterface>{
        const url = this.getUrl(slug);
        return this.httpClient.post<ArticleResponseInterface>(url,{}).pipe(
            map((response)=> response.article)
        )
    }

    removeFromFavorites(slug:string): Observable<ArticleInterface>{
        const url = this.getUrl(slug);
        return this.httpClient.delete<ArticleResponseInterface>(url,{}).pipe(
            map((response)=> response.article)
        )
    }

    getUrl(slug:string): string {
        return `${environment.apiUrl}/articles/$slug/favorite`;
    }
}