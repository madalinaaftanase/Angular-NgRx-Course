import { TestBed } from "@angular/core/testing";
import { ArticleService } from "./article.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { ArticleInterface } from "../types/articles.interface";

describe('ArticleService', () => {
    //test comportament
    let articleService: ArticleService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })

        articleService = TestBed.inject(ArticleService);
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpTestingController.verify()
    })

    it('should create a service', () => {
        expect(articleService).toBeTruthy();
    })

    describe('getArticle', () => {
        it('should return an article', () => {

            let article: ArticleInterface | undefined;
            let url=""

            articleService.getArticle(url).subscribe(response => {
                article = response
            })

            const req = httpTestingController.expectOne('http://localhost:3000/api/articles/')
            req.flush({})

            expect(article).toEqual(undefined) 
            expect(req.request.method).toEqual( 'GET' )
        })

    })
})