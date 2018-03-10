import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BusTrackerComponent } from '../pages/bus-tracker/bus-tracker.component';
import { BusTrackerService } from '../pages/bus-tracker/bus-tracker.service';
import { InfoLinesComponent } from '../pages/info-lines/info-lines.component';
import { InfoLineService } from '../pages/info-lines/info-line.service';



import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BusTrackerComponent,
    InfoLinesComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BusTrackerComponent,
    InfoLinesComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusTrackerService,
    InfoLineService
  ]
})
export class AppModule {}
