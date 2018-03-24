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
import { TranslateService } from '@ngx-translate/core';

import { AboutComponent } from '../about/about.component';


@Component({
  selector: 'preferences',
  templateUrl: 'preferences.component.html'
})


export class PreferencesComponent implements OnInit {

  preferencesList: Array<{ title: string, description: string, goTo: any }>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public translate: TranslateService) {

  }

  ngOnInit() {

    this.preferencesList = [{
      title: this.translate.instant('title_screen_preference'), description: this.translate.instant('summary_screen_preference'), goTo: AboutComponent
    }
    ]


  }

  goTo(goToParam: string) {
    if (goToParam != null) {
      this.navCtrl.push(goToParam);
    }
  }




}
