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
import { PoStepperModule } from '@po-ui/ng-components';
import { PlanosComponent } from './planos/planos.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { CreateCityAndStateComponent } from './create-city-and-state/create-city-and-state.component';
import { PoModalModule } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreCollectionGroup, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PlanosComponent,
    ActivateAccountComponent,
    CreateCityAndStateComponent,

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
    PoTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [ PoStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
