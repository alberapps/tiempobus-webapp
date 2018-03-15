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

  /*dbSource = new Subject<IDBDatabase>();

  dbSource$ = this.dbSource.asObservable();

  // Service message commands
  changeDb(dbParam: IDBDatabase) {
    this.dbSource.next(dbParam);
  }*/

  favoritesListSource = new Subject<Array<IFavorite>>();
  favoritesListSource$ = this.favoritesListSource.asObservable();

  changeFavoritesList(favoritesListParam: Array<IFavorite>) {
    this.favoritesListSource.next(favoritesListParam);
  }

  // Abrir base de datos
  //openDb();


  constructor(public toastCtrl: ToastController) {

    this.openDb();

  }

  /**
   * Abrir la base de datos
   *
   */
  openDb() {
    console.log("openDb ...");

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
      // db = req.result;
      slf.db = this.result;

      //slf.cargarFavoritos(null);

      //slf.changeDb(slf.db);
      //slf.saveDb(this.result);

      console.log("openDb DONE: ", slf.db);
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
  cargarFavoritos(store) {
    console.log("cargar lista favoritos");

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
      // pub_msg.append('<p>There are <strong>' + evt.target.result +
      // '</strong> record(s) in the object store.</p>');

      console.error("resultados: " + evt.target.result);

    };
    req.onerror = function(evt) {
      console.error("add error", this.error);
      //utils.status.show(navigator.mozL10n.get('l10n_favorito_guardar_ko'));
    };

    var i = 0;
    let listaFavoritos = new Array<IFavorite>();
    req = store.openCursor();
    req.onsuccess = function(evt) {
      var cursor = evt.target.result;

      // If the cursor is pointing at something, ask for the data
      if (cursor) {
        console.debug("displayPubList cursor:", cursor);
        req = store.get(cursor.key);
        req.onsuccess = function(evt) {

          var value = evt.target.result;




          var parada = cursor.key;
          var titulo = cursor.value.title;
          var descripcion = cursor.value.description;

          let favorito1: IFavorite = new Favorite();

          favorito1.num = parada;
          favorito1.title = titulo;
          favorito1.description = descripcion;

          listaFavoritos.push(favorito1);

          console.info("dato: " + cursor.key + " es " + cursor.value.titulo);

        };


        cursor.continue();
      }
      else {
        console.debug("fin entradas");

        // Cargar listado en pantalla
        //mostrarListaFavoritos(listaFavoritos);
        slf.changeFavoritesList(listaFavoritos);

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
  addFavorito(newParada, newTitulo: string, newDescripcion: string, modifyId: string, callback: () => any) {

    // Si es una modificacion
    /*if (favoritoSeleccionadoModificar != '') {

      eliminarFavorito(favoritoSeleccionadoModificar);

      newParada = favoritoSeleccionadoModificar;
      favoritoSeleccionadoModificar = '';

    }*/

    var slf = this;

    var obj = { num: newParada, title: newTitulo, description: newDescripcion };

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

      slf.cargarFavoritos(null);

      Utils.showToast('Favorito borrado', slf.toastCtrl);

    };

    request.onerror = function() {
      Utils.showToast('Error en el borrado', slf.toastCtrl);
    };
  }





}
