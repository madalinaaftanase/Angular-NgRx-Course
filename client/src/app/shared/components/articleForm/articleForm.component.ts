import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { ArticleFormValuesInterface } from "./types/articleFormValues.interface";
import { FormBuilder,ReactiveFormsModule } from "@angular/forms";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { BackendErrorMessages } from "../backendErrorMessages/backendErrorMessages.component";

@Component({
    selector: 'app-article-form',
    templateUrl: './articleForm.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, BackendErrorMessages, ReactiveFormsModule]
})

export class ArticleFormComponent implements OnInit {
    private fb = inject(FormBuilder);

    @Input() initialValues?: ArticleFormValuesInterface;
    @Input() isSubmitting: boolean = false;
    @Input() errors: BackendErrorsInterface | null = null;

    @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

    form = this.fb.nonNullable.group({
        title: '',
        description: '',
        body: '',
        tagList: ''
    });

    ngOnInit(): void {

    }

    initializeForm(): void {
        if (!this.initialValues) {
            throw new Error('Inputs are not provided');
        }

        this.form.patchValue({
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' ')
        })
    }

    onSubmit(): void {
        const formValue = this.form.getRawValue();
        const articleFormValues: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' ')
        }
        this.articleSubmit.emit(articleFormValues)
    }

}