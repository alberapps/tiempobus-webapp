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
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FavoritesDbService } from './favorites-db.service';
import { IFavorite } from './favorite';
import { BusTrackerComponent } from '../bus-tracker/bus-tracker.component';
import { Utils } from '../../utils/utils';
import { TranslateService } from '@ngx-translate/core';
//import { Storage } from '@ionic/storage';


@Component({
  selector: 'favorites-list',
  templateUrl: 'favorites-list.component.html'
})


export class FavoritesListComponent implements OnInit {

  stopNumber: string;

  favoritesList: Array<IFavorite>;

  alertTitle: string;
  alertDesc: string;

  //, private storage: Storage

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public favoritesDbService: FavoritesDbService, public alertCtrl: AlertController,
    public translate: TranslateService) {

    favoritesDbService.favoritesListSource$.subscribe(
      favoritesListSource => {
        this.favoritesList = favoritesListSource;
        console.info('favorite list: ', favoritesListSource);
      }
    )

    /*translate.get('mensaje_borrar_pregunta').subscribe(
      value => {
        // value is our translated string
        this.alertTitle = value;
      }
    )*/


  }

  ngOnInit() {

    if (this.navParams.get('stopNumber')) {
      this.stopNumber = this.navParams.get('stopNumber');
    }

    this.favoritesDbService.getFavorites(null);


  }

  loadTracker(stopNumberParam: string) {

    if (stopNumberParam != null && stopNumberParam != '') {

      this.navCtrl.setRoot(BusTrackerComponent, {
        stopNumber: stopNumberParam
      });


    }

  }

  deleteItem(stopNumberParam: string) {

    let slf = this;

    Utils.showConfirm(this.alertCtrl, this.translate.instant('mensaje_borrar_pregunta'), '', function() {
      slf.favoritesDbService.deleteFavorite(stopNumberParam)
    }, this.translate);



  }



}
