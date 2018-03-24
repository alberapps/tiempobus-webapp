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
import { ToastController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
import { IInfoLine, InfoLine } from './info-line';
import { IInfoRoute, InfoRoute } from './info-routes';
import { TamInfo } from '../../utils/tam-info';
import { InfoLineService } from './info-line.service';
import { Utils } from '../../utils/utils';
import { BusTrackerComponent } from '../bus-tracker/bus-tracker.component';
import { TranslateService } from '@ngx-translate/core';

declare const require;

@Component({
  selector: 'info-lines',
  templateUrl: 'info-lines.component.html'
})
export class InfoLinesComponent implements OnInit {

  constructor(public navCtrl: NavController, private infoLineService: InfoLineService,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public navParams: NavParams, public translate: TranslateService) {

  }

  tab: string = 'lines';

  lineList: Array<IInfoLine> = new Array();
  //lineListInf: Array<IInfoLine> = new Array();

  serviceError = false;

  infoRouteData: IInfoRoute = new InfoRoute();

  loader: Loading;

  lineSelected: IInfoLine = new InfoLine();

  ngOnInit() {
    this.loadLinesList();
  }

  loadLinesList() {

    let infoLine: IInfoLine;
    let lineListAux = new Array();

    TamInfo.LINEAS_NUM.forEach(function(line, i) {

      infoLine = new InfoLine();
      infoLine.num = line;
      infoLine.description = TamInfo.LINEAS_DESC[i];
      infoLine.color =   TamInfo.getBusColor(line);

      lineListAux.push(infoLine);

    });

    this.lineList = lineListAux;

    /*for (let i = 0; i < 5; i++) {
      this.lineListInf.push(this.lineList[i]);
    }*/

  }

  loadLineData = (infoRoute: IInfoRoute): void => {

    if (infoRoute != null) {
      this.infoRouteData = infoRoute;
    } else {
      this.infoRouteData = new InfoRoute();
      Utils.showToast('Error', this.toastCtrl);
    }

    this.loader.dismissAll();

  }

  loadRoute(line: IInfoLine) {

    if (line != null && line.num != '') {
      this.lineSelected = line;
      this.loadLineServerData(line.num);
      this.tab = 'forward';
    }

  }

  loadTracker(stopNumberParam: string) {

    if (stopNumberParam != null && stopNumberParam != '') {

      this.navCtrl.setRoot(BusTrackerComponent, {
        stopNumber: stopNumberParam
      });


    }

  }

  private loadLineServerData(lineNumber: string) {

    this.loader = Utils.presentLoading(this.loadingCtrl, this.translate);

    console.log('loadServerData');

    this.serviceError = false;

    this.infoLineService.getServerData(lineNumber)
      .subscribe(results => {
        this.parseXmlData(results);
        console.log('test2: ', this.infoRouteData);
      },
        error => {

          console.error('loadServerData Error');
          this.serviceError = true;

          //this.error = error;
          this.loadLineData(null);

        }
      );



  }


  private parseXmlData(data: String) {

    console.log('Init parse');

    var parser = require('xml2js').parseString;

    var callback = this.loadLineData;

    return parser(data, function(err, result) {
      InfoRoute.parseResult(err, result, callback);
    });

  }

  /*doInfiniteLines(infiniteScroll) {
    console.log('Begin async operation');

    var l = 0;
    var max = 5;

    if (this.lineListInf.length < this.lineList.length && this.lineListInf.length + max < this.lineList.length) {
      l = this.lineListInf.length + max;
    } else if (this.lineListInf.length < this.lineList.length && this.lineListInf.length + max > this.lineList.length) {
      l = this.lineList.length;
    }

    setTimeout(() => {

      for (let i = this.lineListInf.length; i < l; i++) {
        this.lineListInf.push(this.lineList[i]);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }*/


}
