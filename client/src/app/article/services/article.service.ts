import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ArticleService {
    private httpClient = inject(HttpClient)

    deleteArticle(slug: string): Observable<{}> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.httpClient.delete(fullUrl);
    }
}