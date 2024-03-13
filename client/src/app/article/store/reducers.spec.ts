import { articleReducer, initialState } from "./reducers";
import * as ArticleActions from './actions'
import { ArticleInterface } from "../../shared/types/articles.interface";

describe('Post article', () => {
    it('Default state', () => {
        const action = { type: 'Unknown' };

        const state = articleReducer(initialState, action)

        const newState = {
            error: null,
            isLoading: false,
            data: null
        }

        expect(state).toEqual(newState);
    })

    it('Get article', () => {
        const action = ArticleActions.articleActions.getArticle({ slug: "" });

        const state = articleReducer(initialState, action)

        const newState = {
            error: null,
            isLoading: true,
            data: null
        }

        expect(state).toEqual(newState);
    })

    it('Get article success', () => {
        let data: ArticleInterface = {
            body: "",
            createdAt: "",
            description: "",
            favorited: false,
            favoritesCount: 0,
            slug: "",
            tagList: [],
            title: "",
            updatedAt: "",
            author: { username: "", bio: "", image: "", following: false }
        }
        const action = ArticleActions.articleActions.getArticleSuccess({ article: data });

        const state = articleReducer(initialState, action)

        const newState = {
            error: null,
            isLoading: false,
            data: data
        }

        expect(state).toEqual(newState);
    })
})