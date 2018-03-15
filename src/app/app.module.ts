import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { BusTrackerComponent } from '../pages/bus-tracker/bus-tracker.component';
import { BusTrackerService } from '../pages/bus-tracker/bus-tracker.service';
import { InfoLinesComponent } from '../pages/info-lines/info-lines.component';
import { InfoLineService } from '../pages/info-lines/info-line.service';
import { FavoritesNewComponent } from '../pages/favorites/favorites-new.component';
import { FavoritesListComponent } from '../pages/favorites/favorites-list.component';
import { CommunicationService } from './communication.service';
import { FavoritesDbService } from '../pages/favorites/favorites-db.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BusTrackerComponent,
    InfoLinesComponent,
    FavoritesNewComponent,
    FavoritesListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BusTrackerComponent,
    InfoLinesComponent,
    FavoritesNewComponent,
    FavoritesListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BusTrackerService,
    InfoLineService,
    CommunicationService,
    FavoritesDbService
  ]
})
export class AppModule { }
