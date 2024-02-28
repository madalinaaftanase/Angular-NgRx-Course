import { Component, Input, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector:'app-feed-toggler',
    templateUrl:'./feedToggler.component.html',
    standalone: true,
    imports:[CommonModule, RouterLink, RouterLinkActive]
})

export class FeedTogglerComponent{
    @Input() tagName?: string;
    private store = inject(Store);

    currentUser$ = this.store.select(selectCurrentUser);

}