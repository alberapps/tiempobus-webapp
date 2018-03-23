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
import { InfoNode, IInfoNode } from './info-node';

export interface IInfoRoute {
  line: String,
  nameForward: String,
  nameBackward: String,
  forward: Array<IInfoNode>,
  backward: Array<IInfoNode>
}

export class InfoRoute implements IInfoRoute {
  line: String = '';
  nameForward: String = '';
  nameBackward: String = '';
  forward: Array<IInfoNode> = new Array();
  backward: Array<IInfoNode> = new Array();

  static parseResult(err, result, callback: (infoRoute: IInfoRoute) => any) {

    if (err != null) {
      console.log('ERR', err);
      callback(null);
    }
    console.log('End Parse');
    console.log('OK:', result);

    var infoRutaList = result['soap:Envelope']['soap:Body'][0]
    ['GetRutasSublineaResponse'][0]['GetRutasSublineaResult'][0]['InfoRuta'];


    let infoRoute: IInfoRoute = new InfoRoute();

    infoRoute.line = infoRutaList[0]['idLinea'][0];
    infoRoute.nameForward = infoRutaList[0]['nombre'][0];
    infoRoute.forward = InfoRoute.parseInfoRouteNodes(infoRutaList[0]);

    infoRoute.nameBackward = infoRutaList[1]['nombre'][0];
    infoRoute.backward = InfoRoute.parseInfoRouteNodes(infoRutaList[1]);

    callback(infoRoute);

  }

  private static parseInfoRouteNodes(route): Array<IInfoNode> {

    let list: Array<IInfoNode> = new Array();

    let nodesList = route['secciones'][0]['InfoSeccion'][0]['nodos'][0]['InfoNodoSeccion'];

    //console.log('pasoParadaList: ', pasoParadaList);

    let infoNode: IInfoNode;


    nodesList.forEach((item, index) => {
      infoNode = new InfoNode();
      infoNode.num = item['nodo'][0];
      infoNode.name = item['nombre'][0];
      infoNode.coordinates = item['coordenadas'][0];

      list.push(infoNode);

    });

    return list;

  }

}
