import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";
import { combineLatest } from "rxjs";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    imports: [RouterLink, CommonModule]
})

export class TopBarComponent {
    store = inject(Store);
    data$ = combineLatest({
        currentUser: this.store.select(selectCurrentUser)
    })

}