import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";
import { Subscription, combineLatest, filter } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { selectIsSubmitting, selectValidationErrors } from "../store/reducers";
import { BackendErrorMessages } from "../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CurrentUserRequestInterface } from "../../shared/types/currentUserRequest.interface";
import { authActions } from "../../auth/store/actions";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    standalone: true,
    imports: [CommonModule, BackendErrorMessages, LoadingComponent, ReactiveFormsModule]
})
export class SettingsComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    form = this.fb.nonNullable.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
    })

    currentUser?: CurrentUserInterface;
    currentUserSubscription?: Subscription

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    })

    ngOnInit(): void {
        this.currentUserSubscription = this.store.pipe(
            select(selectCurrentUser),
            filter(Boolean),

        ).subscribe(currentUser => {
            this.currentUser = currentUser
            this.initializeForm()
        })
    }

    ngOnDestroy(): void {
        this.currentUserSubscription?.unsubscribe();
    }

    initializeForm(): void {
        if (!this.currentUser) {
            throw new Error('current user is not set Hello')
        }

        this.form.patchValue({
            image: this.currentUser.image ?? '',
            username: this.currentUser.username,
            bio: this.currentUser.bio ?? '',
            email: this.currentUser.email,
            password: ''
        })
    }

    submit(): void {
        if (!this.currentUser) {
            throw new Error('current user is not set')
        }

        const currentUserRequest: CurrentUserRequestInterface = {
            user: {
                ...this.currentUser,
                ...this.form.getRawValue()
            }
        }

        this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }))
    }

    logout(): void {
        console.log("LOGOUT")
        //localStorage.removeItem('accessToken');
        this.store.dispatch(authActions.logout())
    }

}