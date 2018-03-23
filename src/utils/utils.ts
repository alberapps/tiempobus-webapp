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
import { ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

export class Utils {

  static showToast(messageParam: string, toastCtrl: ToastController) {

    let toast = toastCtrl.create({
      message: messageParam,
      duration: 3000
    });
    toast.present();


  }

  static presentLoading(loadingCtrl: LoadingController, translate: TranslateService): Loading {

    let loader = loadingCtrl.create({
      content: translate.instant('aviso_recarga')
    });

    loader.present();


    return loader;

  }

  static showConfirm(alertCtrl: AlertController, title: string, message: string, callback: () => any, translate: TranslateService) {
    let confirm = alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: translate.instant('barcode_no'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: translate.instant('barcode_si'),
          handler: () => {
            console.log('Agree clicked');
            callback();
          }
        }
      ]
    });
    confirm.present();
  }

}
