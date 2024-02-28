import { Component, Input } from "@angular/core";

@Component({
    selector: "app-error-message",
    templateUrl: "./errorMessage.component.html",
    standalone: true,
    imports: []
})

export class ErrorMessageComponent {
    @Input() message: string = 'Something went wrong'
}