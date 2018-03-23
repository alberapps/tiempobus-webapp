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
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BusTrackerComponent } from '../pages/bus-tracker/bus-tracker.component';
import { FavoritesNewComponent } from '../pages/favorites/favorites-new.component';
import { FavoritesListComponent } from '../pages/favorites/favorites-list.component';
import { PreferencesComponent } from '../pages/preferences/preferences.component';

import { CommunicationService } from './communication.service';
import { FavoritesDbService } from '../pages/favorites/favorites-db.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BusTrackerComponent;

  pages: Array<{ title: string, component: any, isRoot: boolean, ionicon: string }>;

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
      { title: 'menu_favoritos', component: FavoritesListComponent, isRoot: false, ionicon: 'bookmarks' },
      { title: 'nuevo_guardar', component: FavoritesNewComponent, isRoot: false, ionicon: 'bookmark' },
      { title: 'preferences', component: PreferencesComponent, isRoot: false, ionicon: 'settings' }

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
