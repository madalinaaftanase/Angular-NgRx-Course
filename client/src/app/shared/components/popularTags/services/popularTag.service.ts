import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { PopularTagType } from "../../../types/popularTag.type";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class PopularTagService {
    private httpClient = inject(HttpClient)

    getPopularTags(): Observable<PopularTagType[]> {
        const url = environment.apiUrl + '/tags';
        return this.httpClient.get<GetPopularTagsResponseInterface>(url).pipe(map((response) => response.tags));
    }
}