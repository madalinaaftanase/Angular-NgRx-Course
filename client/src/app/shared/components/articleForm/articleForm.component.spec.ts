import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormComponent } from './articleForm.component';
import { By } from '@angular/platform-browser';

describe('ArticleFormComponent', () => {
    let component: ArticleFormComponent;
    let fixture: ComponentFixture<ArticleFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArticleFormComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); //detectare schimbari
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set form to empty strings by default', () => {
        const form = component.form;

        expect(form.getRawValue()).toEqual({ title: '', description: '', body: '', tagList: '' });
    })

    it("should call on submit when the form is subbmited", () => {
        spyOn(component, "onSubmit");

        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        fixture.detectChanges();

        expect(component.onSubmit).toHaveBeenCalled();
    })

    it('form should be invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('submit button should be disable when form is not valid', ()=>{
        const btn = fixture.debugElement.query(By.css('[data-testid="submitButton"]')).nativeElement;

        expect(btn.disabled).toEqual(true);
        //expect(btn.classes['disable']).toEqual(true)
    })
});