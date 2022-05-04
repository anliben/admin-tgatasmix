import { NgModule } from '@angular/core';
import { PoFieldModule, PoModule, PoTableModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PoStorageModule, PoStorageService } from '@po-ui/ng-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guards.service';
import { PoStepperModule } from '@po-ui/ng-components';
import { PlanosComponent } from './planos/planos.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CreateCityAndStateComponent } from './create-city-and-state/create-city-and-state.component';
import { PoModalModule } from '@po-ui/ng-components';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PlanosComponent,
    ActivateAccountComponent,
    CreateCityAndStateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoPageLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PoStorageModule.forRoot(),
    BrowserAnimationsModule,
    PoFieldModule,
    FormsModule,
    StarRatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PoTemplatesModule,
    BrowserAnimationsModule,
    PoStepperModule,
    PoModalModule,
    PoTableModule
  ],
  providers: [AuthGuard, PoStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
