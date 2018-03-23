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
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BusTrackerService } from './bus-tracker.service';
import { xmlParser } from 'xml2js';
import { IBusInfo, BusInfo } from './bus-info';
import { ToastController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../utils/utils';
import { InfoLinesComponent } from '../info-lines/info-lines.component';
import { CommunicationService } from '../../app/communication.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

export class FormInput {

  hourRef: Date;

  constructor(
    public parada: string
  ) { }

}

// use the require method provided by webpack
declare const require;

@Component({
  selector: 'bus-tracker',
  templateUrl: './bus-tracker.component.html'
})

export class BusTrackerComponent implements OnInit {

  timeItems = [];
  error;
  contents;

  stopNumber = '4450';

  model = new FormInput('');

  serviceError = false;

  loader: Loading;

  private errorText = '';


  constructor(private trackerService: BusTrackerService, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public navCtrl: NavController,
    public navParams: NavParams, public communicationService: CommunicationService,
    private storage: Storage, public translate: TranslateService
  ) {

    translate.get('error_generico_1').subscribe(
      value => {
        // value is our translated string
        this.errorText = value;
      }
    )


  }

  ngOnInit() {

    if (this.navParams.get('stopNumber')) {

      this.stopNumber = this.navParams.get('stopNumber');
      this.model.parada = this.stopNumber;
      this.loadServerData(this.stopNumber);

    } else {

      this.storage.get('stopNumberInit').then((val) => {
        console.log('Init stopNumber', val);

        if (val != null && val != '') {
          this.model.parada = val;
        } else {
          this.model.parada = this.stopNumber;
        }

        this.loadServerData(this.stopNumber);

      });

    }

    this.model.hourRef = new Date();

  }

  onSubmit() {

    console.log('onSubmit');

    if (this.model.parada != '' && this.model.parada.length == 4) {
      this.stopNumber = this.model.parada;
      this.loadServerData(this.model.parada);
    } else {
      Utils.showToast(this.errorText, this.toastCtrl);
    }

  }

  //get diagnostic() { return JSON.stringify(this.model); }

  loadTimes = (busInfoList: Array<IBusInfo>): void => {

    if (busInfoList != null) {
      this.timeItems = busInfoList;
    } else {
      this.timeItems = [];
      Utils.showToast(this.errorText, this.toastCtrl);
    }

    this.model.hourRef = new Date();

    this.communicationService.changeStopNumber(this.stopNumber);

    this.storage.set('stopNumberInit', this.stopNumber);

    this.loader.dismissAll();

  }

  loadServerData(stopNumber: string) {

    this.loader = Utils.presentLoading(this.loadingCtrl, this.translate);

    console.log('loadServerData');

    this.serviceError = false;

    this.trackerService.getServerData(stopNumber)
      .subscribe(results => {
        this.parseXmlData(results);
      },
        error => {

          console.error('loadServerData Error');
          this.serviceError = true;

          this.error = error;
          this.loadTimes(null);

        }
      );



  }


  private parseXmlData(data: String) {

    console.log('Init parse');


    var parser = require('xml2js').parseString;

    var callback = this.loadTimes;

    return parser(data, function(err, result) {
      BusInfo.parseResult(err, result, callback);
    });

  }

  goToInfoLines() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(InfoLinesComponent);
  }


}
