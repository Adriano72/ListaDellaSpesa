import { Component } from '@angular/core';
import { NavController, NavParams, Alert} from 'ionic-angular';

/*
  Generated class for the ListaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lista/lista.html',
})
export class ListaPage {

  lista: any;

  constructor(public nav: NavController, public navParams: NavParams) {
        this.lista = this.navParams.get('lista');
        console.log("LISTA "+this.lista);

    }

}
