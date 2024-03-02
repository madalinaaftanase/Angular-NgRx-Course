import { ArticleInterface } from "../../shared/types/articles.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export interface EditArticleStateInterface {
    isSubmitting: boolean,
    validationErrors: BackendErrorsInterface | null,
    isLoading: boolean,
    article: ArticleInterface | null

}