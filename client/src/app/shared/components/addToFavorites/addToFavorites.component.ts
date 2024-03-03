import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { AddToFavoriteService } from "./services/addToFavorites.service";
import { Store } from "@ngrx/store";
import { addToFavoritesActions } from "./store/actions";

@Component({
    selector: 'app-add-to-favorites',
    templateUrl: './addToFavorites.component.html',
    standalone: true,
    imports: [CommonModule],
    providers: [AddToFavoriteService]
})
export class AddToFavoritesComponent {
    private store = inject(Store);

    @Input() isFavorited: boolean = false;
    @Input() articleSlug: string = "";
    @Input() favoritesCount: number = 0;

    handleLike(): void {
        this.store.dispatch(addToFavoritesActions.addToFavorites({
            isFavorited: this.isFavorited,
            slug: this.articleSlug
        }));
        
        if (this.isFavorited) {
            this.favoritesCount = this.favoritesCount - 1;
        } else {
            this.favoritesCount = this.favoritesCount + 1;
        }

        this.isFavorited = !this.isFavorited;
    }
}