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
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { Utils } from '../../utils/utils';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'about',
  templateUrl: 'about.component.html'
})


export class AboutComponent implements OnInit {


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public translate: TranslateService) {

  }

  ngOnInit() {



  }

}
