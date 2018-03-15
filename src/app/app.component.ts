import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { BusTrackerComponent } from '../pages/bus-tracker/bus-tracker.component';
import { FavoritesNewComponent } from '../pages/favorites/favorites-new.component';
import { FavoritesListComponent } from '../pages/favorites/favorites-list.component';
import { CommunicationService } from './communication.service';
import { FavoritesDbService } from '../pages/favorites/favorites-db.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BusTrackerComponent;

  pages: Array<{ title: string, component: any, isRoot: boolean }>;

  stopNumber: string;

  //@ViewChild(BusTrackerComponent)
  //private busTrackerComponent: BusTrackerComponent;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public communicationService: CommunicationService, public favoritesDbService: FavoritesDbService,
    translate: TranslateService) {

    this.initializeApp();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    translate.use('es');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bus Tracker', component: BusTrackerComponent, isRoot: true },
      { title: 'Favoritos', component: FavoritesListComponent, isRoot: false },
      { title: 'Guardar', component: FavoritesNewComponent, isRoot: false },
      { title: 'Home', component: HomePage, isRoot: true },
      { title: 'List', component: ListPage, isRoot: true }

    ];

    communicationService.stopNumberSource$.subscribe(
      stopNumber => {
        this.stopNumber = stopNumber;
        console.info('stopNumber: ', stopNumber);
      }
    )

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.isRoot) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component, {
        stopNumber: this.stopNumber
      });
    }
  }

}
