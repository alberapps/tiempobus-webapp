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
