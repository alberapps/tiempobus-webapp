/**
 * TiempoBus - Informacion sobre tiempos de paso de autobuses en Alicante
 * Copyright (C) 2018 Alberto Montiel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { BusTrackerComponent } from '../pages/bus-tracker/bus-tracker.component';
import { BusTrackerService } from '../pages/bus-tracker/bus-tracker.service';
import { InfoLinesComponent } from '../pages/info-lines/info-lines.component';
import { InfoLineService } from '../pages/info-lines/info-line.service';
import { FavoritesNewComponent } from '../pages/favorites/favorites-new.component';
import { FavoritesListComponent } from '../pages/favorites/favorites-list.component';
import { PreferencesComponent } from '../pages/preferences/preferences.component';
import { AboutComponent } from '../pages/about/about.component';

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
    AboutComponent,
    PreferencesComponent,
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
    AboutComponent,
    PreferencesComponent,
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
