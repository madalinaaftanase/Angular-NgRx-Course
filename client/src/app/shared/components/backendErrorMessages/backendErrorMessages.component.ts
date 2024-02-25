import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-backend-error-messages',
    standalone: true,
    templateUrl: './backendErrorMessages.component.html',
    imports: [CommonModule]

})

export class BackendErrorMessages implements OnInit {
    @Input() backendErrors: BackendErrorsInterface = {}
    errorMessages: string[] = []

    ngOnInit(): void {
        this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
            const messages = this.backendErrors[name];
            return `${name}:  ${messages}`
        })
    }
}