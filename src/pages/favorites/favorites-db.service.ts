import { Injectable } from '@angular/core';
import { Favorite, IFavorite } from './favorite';
import { Subject } from 'rxjs/Subject';
import { ToastController } from 'ionic-angular';
import { Utils } from '../../utils/utils';

@Injectable()
export class FavoritesDbService {

  /**
   * Configuracion e inicializacion de la base de datos
   */

  static DB_NAME = 'tiempobus-indexeddb';
  static DB_VERSION = 2;
  static DB_STORE_NAME = 'favorites';

  public db: IDBDatabase;

  favoritesListSource = new Subject<Array<IFavorite>>();
  favoritesListSource$ = this.favoritesListSource.asObservable();

  changeFavoritesList(favoritesListParam: Array<IFavorite>) {
    this.favoritesListSource.next(favoritesListParam);
  }


  constructor(public toastCtrl: ToastController) {

    this.openDb();

  }

  /**
   * Abrir la base de datos
   *
   */
  openDb() {
    console.info("openDb ...");

    if (!window.indexedDB) {
      Utils.showToast('Error: Función no disponible en tu navegador', this.toastCtrl);
      return;
    }

    if (this.db != null) {
      return;
    }

    var slf = this;

    let req = indexedDB.open(FavoritesDbService.DB_NAME, FavoritesDbService.DB_VERSION);

    req.onsuccess = function(evt) {
      // Better use "this" than "req" to get the result to avoid problems with
      // garbage collection.
      slf.db = this.result;

      console.info("openDb DONE: ", slf.db);
    };
    req.onerror = function(evt) {
      console.error("openDb:", evt);
      console.error('Error DB');
    };

    req.onupgradeneeded = function() {
      console.log("openDb.onupgradeneeded: ", this.result);

      slf.db = this.result;

      var store = this.result.createObjectStore(
        FavoritesDbService.DB_STORE_NAME, { keyPath: 'num' });

      store.createIndex('title', 'title', { unique: false });
      store.createIndex('description', 'description', { unique: false });

    };
  }

  private saveDb(result) {
    console.info('saveDb: ', result);
    this.db = result;
  }

  /**
  * @param {string}
  *            store_name
  * @param {string}
  *            mode either "readonly" or "readwrite"
  */
  getObjectStore(store_name, mode) {
    console.info('db: ' + this.db);
    var tx = this.db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

  clearObjectStore(store_name) {
    var store = this.getObjectStore(FavoritesDbService.DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {

      // TODO

    };
    req.onerror = function(evt) {
      //console.error("clearObjectStore:", evt.target.errorCode);

      // TODO

    };
  }


  /**
   * @param {IDBObjectStore=}
   *            store
   */
  getFavorites(store) {
    console.info("cargar lista favoritos");

    var slf = this;

    if (store == null) {
      store = this.getObjectStore(FavoritesDbService.DB_STORE_NAME, 'readonly');
    }



    var req;
    req = store.count();
    // Requests are executed in the order in which they were made against the
    // transaction, and their results are returned in the same order.
    // Thus the count text below will be displayed before the actual pub list
    // (not that it is algorithmically important in this case).
    req.onsuccess = function(evt) {
      console.error("resultados: " + evt.target.result);
    };
    req.onerror = function(evt) {
      console.error("add error", this.error);
      Utils.showToast('Error en la carga de favoritos', slf.toastCtrl);
    };

    var i = 0;
    let favoritesList = new Array<IFavorite>();
    req = store.openCursor();
    req.onsuccess = function(evt) {
      var cursor = evt.target.result;

      // If the cursor is pointing at something, ask for the data
      if (cursor) {
        console.debug("displayPubList cursor:", cursor);
        req = store.get(cursor.key);
        req.onsuccess = function(evt) {

          var value = evt.target.result;

          let favorite1: IFavorite = new Favorite();

          favorite1.num = cursor.key;
          favorite1.title = cursor.value.title;
          favorite1.description = cursor.value.description;

          favoritesList.push(favorite1);

          console.info("dato: " + cursor.key + " es " + cursor.value.title);

        };

        cursor.continue();
      }
      else {
        console.info("fin entradas");

        slf.changeFavoritesList(favoritesList);

      }
    };




  }

  /**
 * @param {string}
 *            biblioid
 * @param {string}
 *            title
 * @param {number}
 *            year
 * @param {Blob=}
 *            blob
 */
  newFavorite(newNum: string, newTitle: string, newDescription: string, modifyId: string, callback: () => any) {

    var slf = this;

    var obj = { num: newNum, title: newTitle, description: newDescription };

    var store = this.getObjectStore(FavoritesDbService.DB_STORE_NAME, 'readwrite');
    var req;
    try {
      req = store.add(obj);
    } catch (e) {

      throw e;
    }
    req.onsuccess = function(evt) {
      console.log("Insertion in DB successful");

      Utils.showToast('Favorito guardado', slf.toastCtrl);

      callback();

    };
    req.onerror = function(error) {
      console.error(error);
      Utils.showToast('Error en el borrado', slf.toastCtrl);
    };
  }

  /**
 * Eliminar el favorito seleccionado
 */
  deleteFavorite(stopNumber) {

    var slf = this;

    var request = this.db.transaction(["favorites"], "readwrite")
      .objectStore("favorites")
      .delete(stopNumber);


    request.onsuccess = function(event) {

      slf.getFavorites(null);

      Utils.showToast('Favorito borrado', slf.toastCtrl);

    };

    request.onerror = function() {
      Utils.showToast('Error en el borrado', slf.toastCtrl);
    };
  }





}
