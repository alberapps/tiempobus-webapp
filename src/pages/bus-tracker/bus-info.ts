export interface IBusInfo {
  linea: String,
  parada: String,
  ruta: String,
  tiempo1: String,
  tiempo2: String
}

export class BusInfo implements IBusInfo {
  linea: String = '';
  parada: String = '';
  ruta: String = '';
  tiempo1: string = '';
  tiempo2: string = '';


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

      busInfoList.push(busInfo);

      console.log('busInfo: ', busInfoList);

    });

    callback(busInfoList);

  }

}
