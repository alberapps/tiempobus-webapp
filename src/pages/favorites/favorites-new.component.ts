import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
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
