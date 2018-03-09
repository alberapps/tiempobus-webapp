import { ToastController, LoadingController, Loading } from 'ionic-angular';

export class Utils {

  static showToast(messageParam: string, toastCtrl: ToastController){

    let toast = toastCtrl.create({
      message: messageParam,
      duration: 3000
    });
    toast.present();


  }

  static presentLoading(loadingCtrl: LoadingController): Loading{

      let loader = loadingCtrl.create({
            content: "Please wait..."
          });

      loader.present();


    return loader;

  }

}
