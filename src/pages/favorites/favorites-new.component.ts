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
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesDbService } from './favorites-db.service';
import { BusTrackerComponent } from '../bus-tracker/bus-tracker.component';

//import { Storage } from '@ionic/storage';

export class FormInput {

  constructor(
    public title: string,
    public description: string
  ) { }

}


@Component({
  selector: 'favorites-new',
  templateUrl: 'favorites-new.component.html'
})


export class FavoritesNewComponent implements OnInit {

  stopNumber: string;

  model = new FormInput('', '');

  //, private storage: Storage

  constructor(public navCtrl: NavController, public navParams: NavParams, public favoritesDbService: FavoritesDbService) {


  }

  ngOnInit() {

    if (this.navParams.get('stopNumber')) {
      this.stopNumber = this.navParams.get('stopNumber');
    }

  }

  onSubmit() {

    console.log('onSubmit');

    var slf = this;

    this.favoritesDbService.newFavorite(this.stopNumber, this.model.title, this.model.description, '', function() {
      slf.navCtrl.setRoot(BusTrackerComponent);
    });



  }




}
