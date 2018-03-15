import { ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';

export class Utils {

  static showToast(messageParam: string, toastCtrl: ToastController) {

    let toast = toastCtrl.create({
      message: messageParam,
      duration: 3000
    });
    toast.present();


  }

  static presentLoading(loadingCtrl: LoadingController): Loading {

    let loader = loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present();


    return loader;

  }

  static showConfirm(alertCtrl: AlertController, title: string, message: string, callback: () => any) {
    let confirm = alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí',
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
