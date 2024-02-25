import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { authActions } from "../store/actions";
import { CommonModule } from "@angular/common";
import { selectIsSubmitting, selectValidationErrors } from "../store/reducers";
import { BackendErrorMessages } from "../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, BackendErrorMessages, RouterLink]
})

export class LoginComponent {
    form = this.fb.nonNullable.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    })

    constructor(private fb: FormBuilder, private store: Store) { }

    onSubmit() {
        console.log(this.form.getRawValue())
        const request: LoginRequestInterface = {
            user: this.form.getRawValue()
        }

        this.store.dispatch(authActions.login({ request }))
    }
}