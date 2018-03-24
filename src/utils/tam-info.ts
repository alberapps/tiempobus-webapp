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
export class TamInfo {

  //Datos lineas

  static LINEAS_DESC = ["21 ALICANTE-P.S.JUAN-EL CAMPELLO", "22 ALICANTE-C. HUERTAS-P.S. JUAN", "23 ALICANTE-SANT JOAN-MUTXAMEL", "24 ALICANTE-UNIVERSIDAD-S.VICENTE", "25 ALICANTE-VILLAFRANQUEZA", "26 ALICANTE-VILLAFRANQUEZA-TANGEL", "27 ALICANTE(O.ESPLA) - URBANOVA", "30 SAN VICENTE-LA ALCORAYA", "C-55 EL CAMPELLO-UNIVERSIDAD", "35 ALICANTE-PAULINAS-MUTXAMEL", "36 SAN GABRIEL-UNIVERSIDAD", "38 P.S.JUAN-H.ST.JOAN-UNIVERSIDAD", "39 EXPLANADA - C. TECNIFICACIÓN", "21N ALICANTE- P.S.JUAN-EL CAMPELLO", "22N ALICANTE- PLAYA SAN JUAN", "23N ALICANTE-SANT JOAN- MUTXAMEL", "24N ALICANTE-UNIVERSIDAD-S.VICENTE", "01 S. GABRIEL-JUAN XXIII  (1ºS)", "02 LA FLORIDA-SAGRADA FAMILIA", "03 CIUDAD DE ASIS-COLONIA REQUENA", "04 CEMENTERIO-TOMBOLA", "05 EXPLANADA-SAN BLAS-RABASA", "06 AV.ÓSCAR ESPLÁ - COLONIA REQUENA", "07 AV.ÓSCAR ESPLÁ-EL REBOLLEDO", "08 EXPLANADA -VIRGEN REMEDIO", "09 AV.ÓSCAR ESPLÁ - AV. NACIONES", "10 EXPLANADA - VIA PARQUE", "11 V.REMEDIO-AV DENIA (JESUITAS)", "11H V.REMEDIO-AV. DENIA-HOSP.ST JOAN", "12 AV. CONSTITUCION-S. BLAS(PAUI)", "16 PZA. ESPAÑA-MERCADILLO TEULADA", "17 ZONA NORTE-MERCADILLO TEULADA", "191 PLA - CAROLINAS - RICO PEREZ", "192 C. ASIS - BENALUA - RICO PEREZ", "M-2 MUTXAMEL - GIRASOLES", "M-1 MUTXAMEL - VALLE DEL SOL", "136 MUTXAMEL - CEMENTERIO", "C2 VENTA LANUZA - EL CAMPELLO", "C-51 MUTXAMEL - BUSOT", "C-52 BUSOT - EL CAMPELLO", "C-53 HOSPITAL SANT JOAN - EL CAMPELLO", "C-54 UNIVERSIDAD-HOSP. SANT JOAN", "C-6 ALICANTE-AEROPUERTO", "45 HOSPITAL-GIRASOLES-MANCHEGOS", "46A HOSPITAL-VILLAMONTES-S.ANTONIO", "46B HOSPITAL-P.CANASTELL-P.COTXETA", "TURI BUS TURÍSTICO (TURIBUS)", "31 MUTXAMEL-ST.JOAN-PLAYA S. JUAN", "30P SAN VICENTE-PLAYA SAN JUAN", "C-6* ALICANTE-URBANOVA-AEROPUERTO", "123 ESPECIAL SANTA FAZ", "13 ALICANTE - VILLAFRANQUEZA", "SE ESPECIAL SAN VICENTE", "TRANSPORTE URBANO XIXONA", "03N CIUDAD ASIS - VILLAFRANQUEZA", "A CIRCULAR P. DEL MAR-GRAN VIA", "B CIRCULAR P. DEL MAR-GRAN VIA"];

  static LINEAS_NUM = ["21", "22", "23", "24", "25", "26", "27", "30", "C-55", "35", "36", "38", "39", "21N", "22N", "23N", "24N", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "11H", "12", "16", "17", "191", "192", "M-2", "M-1", "136", "C2", "C-51", "C-52", "C-53", "C-54", "C-6", "45", "46A", "46B", "TURI", "31", "30P", "C-6*", "123", "13", "SE", "U-1", "03N", "A", "B"];

  static LINEAS_URBANAS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "11H", "12", "13", "16", "17", "191", "192", "22", "22N", "27", "39", "45", "03N", "A", "B"];

  static getBusColor(line: string): string {

    if (this.LINEAS_URBANAS.indexOf(line) > -1) {
      return 'bus-red';
    }

    return 'bus-blue';

  }


}
