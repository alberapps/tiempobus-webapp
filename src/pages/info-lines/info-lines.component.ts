import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
import { IInfoLine, InfoLine } from './info-line';
import { IInfoRoute, InfoRoute } from './info-routes';
import { TamInfo } from '../../utils/tam-info';
import { InfoLineService } from './info-line.service';
import { InfoNode, IInfoNode } from './info-node';
import { Utils } from '../../utils/utils';
import { BusTrackerComponent } from '../bus-tracker/bus-tracker.component';

declare const require;

@Component({
  selector: 'info-lines',
  templateUrl: 'info-lines.component.html'
})
export class InfoLinesComponent implements OnInit{

  constructor(public navCtrl: NavController, private infoLineService: InfoLineService,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public navParams: NavParams) {

  }

  tab: string = 'lines';

  lineList: Array<IInfoLine> = new Array();

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

      lineListAux.push(infoLine);

    });

    this.lineList = lineListAux;

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

    this.loader = Utils.presentLoading(this.loadingCtrl);

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


}
