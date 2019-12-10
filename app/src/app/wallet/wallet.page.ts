import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../@shared/services/api.service';
import { untilComponentDestroyed } from '../@shared/operators';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.page.html',
    styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {
    private listing$: BehaviorSubject<any>;

    constructor(private apiService: ApiService) {
        this.listing$ = new BehaviorSubject([]);
    }

    ngOnDestroy() {}
    ngOnInit() {
        this.apiService
            .get<any>('/user/event')
            .pipe(untilComponentDestroyed(this))
            .subscribe(v => {
                this.listing$.next(v.events);
            });
    }
}
