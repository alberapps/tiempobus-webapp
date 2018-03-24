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
import { TamInfo } from '../../utils/tam-info';

export interface IBusInfo {
  linea: string,
  parada: string,
  ruta: string,
  tiempo1: string,
  tiempo2: string,
  color: string
}

export class BusInfo implements IBusInfo {
  linea: string = '';
  parada: string = '';
  ruta: string = '';
  tiempo1: string = '';
  tiempo2: string = '';
  color: string = 'bus-blue'


  public getHourTime(timeParam) {

    var time = timeParam == 1 ? this.tiempo1 : this.tiempo2;

    if (time != '0') {

      var dateTime = new Date();
      var minutos1Int = parseInt(time);

      dateTime.setMinutes(new Date().getMinutes() + minutos1Int);
      return this.formatHour(dateTime.getHours(), dateTime.getMinutes());

    } else {
      return 0
    }


  }

  private formatHour(hora, minutos) {
    return ("0" + hora).slice(-2) + ":" + ("0" + minutos).slice(-2);
  }


  static parseResult(err, result, callback: (busInfoList: Array<IBusInfo>) => any) {
    if (err != null) {
      console.log('ERR', err);
      callback(null);
    }
    console.log('End Parse');
    console.log('OK:', result);

    var pasoParadaList = result['soap:Envelope']['soap:Body'][0]
    ['GetPasoParadaResponse'][0]['GetPasoParadaResult'][0]['PasoParada'];

    console.log('pasoParadaList: ', pasoParadaList);

    let busInfo: IBusInfo;
    let busInfoList: Array<IBusInfo> = new Array();

    pasoParadaList.forEach((item, index) => {
      busInfo = new BusInfo();
      busInfo.linea = item['linea'][0];
      busInfo.parada = item['parada'][0];
      busInfo.ruta = item['ruta'][0];
      busInfo.tiempo1 = item['e1'][0]['minutos'][0];
      busInfo.tiempo2 = item['e2'][0]['minutos'][0];

      busInfo.color = TamInfo.getBusColor(busInfo.linea);

      busInfoList.push(busInfo);

      console.log('busInfo: ', busInfoList);

    });

    callback(busInfoList);

  }

}
