import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/@shared/services/api.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { untilComponentDestroyed } from 'src/app/@shared/operators';

@Component({
    selector: 'save-event-button',
    templateUrl: './save-event-button.component.html',
    styleUrls: ['./save-event-button.component.scss'],
})
export class SaveEventButtonComponent implements OnInit, OnDestroy {
    @Input() eventID: string;

    public isBookmarked: BehaviorSubject<boolean>;

    constructor(
        private readonly apiService: ApiService,
        private readonly authService: AuthService,
    ) {
        this.isBookmarked = new BehaviorSubject(false);
    }

    ngOnDestroy() {}
    ngOnInit() {
        this.authService.userInfo$
            .pipe(untilComponentDestroyed(this))
            .subscribe(v => {
                if (v && v.user) {
                    this.isBookmarked.next(
                        v.user.bookmarks.includes(this.eventID),
                    );
                }
            });
    }

    addBookmark() {
        this.apiService
            .post<any>('/user/bookmark/' + this.eventID)
            .pipe(untilComponentDestroyed(this))
            .subscribe(_ => {
                this.authService.refresh();
            });
    }

    removeBookmark() {
        this.apiService
            .delete<any>('/user/bookmark/' + this.eventID)
            .pipe(untilComponentDestroyed(this))
            .subscribe(_ => {
                this.authService.refresh();
            });
    }
}
