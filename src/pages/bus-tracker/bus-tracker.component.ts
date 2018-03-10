import { Component, OnInit } from '@angular/core';
import { BusTrackerService } from './bus-tracker.service';
import { xmlParser } from 'xml2js';
import { IBusInfo, BusInfo } from './bus-info';
import { ToastController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../utils/utils';
import { InfoLinesComponent } from '../info-lines/info-lines.component';

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

  constructor(private trackerService: BusTrackerService, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ngOnInit() {

    if (this.navParams.get('stopNumber')) {
      this.stopNumber = this.navParams.get('stopNumber');
    }

    this.model.parada = this.stopNumber;
    this.model.hourRef = new Date();

    this.loadServerData(this.stopNumber);

  }

  onSubmit() {

    console.log('onSubmit');

    if (this.model.parada != '' && this.model.parada.length == 4) {
      this.stopNumber = this.model.parada;
      this.loadServerData(this.model.parada);
    } else {
      Utils.showToast('Error', this.toastCtrl);
    }

  }

  //get diagnostic() { return JSON.stringify(this.model); }

  loadTimes = (busInfoList: Array<IBusInfo>): void => {

    if (busInfoList != null) {
      this.timeItems = busInfoList;
    } else {
      this.timeItems = [];
      Utils.showToast('Error', this.toastCtrl);
    }

    this.model.hourRef = new Date();

    this.loader.dismissAll();

  }

  loadServerData(stopNumber: string) {

    this.loader = Utils.presentLoading(this.loadingCtrl);

    console.log('loadServerData');

    this.serviceError = false;

    this.trackerService.getServerData(stopNumber)
      .subscribe(results => {
        this.parseXmlData(results);
        //console.log('test1: ', this.contents );
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
