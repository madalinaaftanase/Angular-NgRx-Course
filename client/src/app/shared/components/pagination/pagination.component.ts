import { Component, Input, OnInit, inject } from "@angular/core";
import { UtilsService } from "../../services/utils.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-pagination',
    standalone: true,
    templateUrl: './pagination.component.html',
    imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
    private utilsService = inject(UtilsService)
    @Input() total: number = 0;
    @Input() currentPage: number = 0;
    @Input() url: string = '';
    @Input() limit: number = 20;

    pagesCount: number = 1;
    pages: number[] = [];

    ngOnInit(): void {
        this.pagesCount = Math.ceil(this.total / this.limit);
        this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
    }
}