import { createFeature, createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types/settingsState.interface";
import { authActions } from "../../auth/store/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: SettingsStateInterface = {
    validationErrors: null,
    isSubmitting: false
}

const settingsFeature = createFeature({
    name: 'settings',
    reducer: createReducer(
        initialState,

        on(authActions.updateCurrentUser, (state, action) => ({
            ...state,
            isSubmitting: true
        })),
        on(authActions.updateCurrentUserSuccess, (state, action) => ({
            ...state,
            isSubmitting: false,
        })),
        on(authActions.updateCurrentUserFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })),

        on(routerNavigatedAction, () => initialState)
    )
})

export const {
    name: settingsFeatureKey,
    reducer: settingsReducer,
    selectIsSubmitting,
    selectValidationErrors } = settingsFeature