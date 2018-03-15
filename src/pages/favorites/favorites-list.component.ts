import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Loading, NavController, NavParams, AlertController } from 'ionic-angular';
import { FavoritesDbService } from './favorites-db.service';
import { Favorite, IFavorite } from './favorite';
import { BusTrackerComponent } from '../bus-tracker/bus-tracker.component';
import { Utils } from '../../utils/utils';
//import { Storage } from '@ionic/storage';


@Component({
  selector: 'favorites-list',
  templateUrl: 'favorites-list.component.html'
})


export class FavoritesListComponent implements OnInit {

  stopNumber: string;

  favoritesList: Array<IFavorite>;

  //, private storage: Storage

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public favoritesDbService: FavoritesDbService, public alertCtrl: AlertController) {

    favoritesDbService.favoritesListSource$.subscribe(
      favoritesListSource => {
        this.favoritesList = favoritesListSource;
        console.info('favorite list: ', favoritesListSource);
      }
    )

  }

  ngOnInit() {

    if (this.navParams.get('stopNumber')) {
      this.stopNumber = this.navParams.get('stopNumber');
    }

    this.favoritesDbService.cargarFavoritos(null);


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

    Utils.showConfirm(this.alertCtrl, 'Confirmar borrado', '¿Seguro que quieres borrar?', function() {
      slf.favoritesDbService.deleteFavorite(stopNumberParam)
    });



  }



}
