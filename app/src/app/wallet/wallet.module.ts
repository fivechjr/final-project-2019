import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { SharedModule } from '../@shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        WalletPageRoutingModule,
    ],
    declarations: [WalletPage],
})
export class WalletPageModule {}
