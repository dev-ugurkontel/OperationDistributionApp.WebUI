import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { CacheService, DistributionService } from '../services';
import { MainComponent } from './main/main.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxoItemModule, DxoToolbarModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreRoutingModule,
    DxDataGridModule,
    DxoToolbarModule,
    DxoItemModule
  ],
  providers: [
    DistributionService,
    CacheService
  ]
})
export class CoreModule { }
