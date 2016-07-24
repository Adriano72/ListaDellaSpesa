import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {ListaPage} from '../lista/lista';
import {ListaModel} from '../../providers/lista-model/lista-model';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  liste: ListaModel[] = [];

  constructor(public nav: NavController, public dataService: Data) {

    this.dataService.getData().then((liste) => {
      let savedListe: any = false;
      if (typeof (liste) != "undefined") {
        savedListe = JSON.parse(liste);
      }
      if (savedListe) {
        savedListe.forEach((savedLista) => {
          let loadLista = new ListaModel(
            savedLista.title,
            savedLista.items
            );
          this.liste.push(loadLista);
          loadLista.lista.subscribe(update => {
            this.save();
          });
        });
      }
    });
  }

  aggiungiLista(): void {

    let prompt = Alert.create({
      title: 'Nuova Lista',
      message: 'Scrivi il nome della tua nuova lista della spesa:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Annulla'
        },
        {
          text: 'Salva',
          handler: data => {

            let nuovaLista = new ListaModel(data.name, []);

            this.liste.push(nuovaLista);

            nuovaLista.lista.subscribe(update => {
              this.save();
            });

            this.save();

          }
        }
      ]
    });

    this.nav.present(prompt);

  }

  rinominaLista(lista): void {
    let prompt = Alert.create({
      title: 'Rename Lista',
      message: 'Inserisci il nuovo nome della lista:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Annulla'
        },
        {
          text: 'Salva',
          handler: data => {
            let index = this.liste.indexOf(lista);
            if (index > -1) {
              this.liste[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  vediLista(lista): void {
    this.nav.push(ListaPage, {
      lista: lista
    });
  }

  rimuoviLista(lista): void {
    let index = this.liste.indexOf(lista);
    if (index > -1) {
      this.liste.splice(index, 1);
      this.save();
    }
  }

  save(): void {
    this.dataService.save(this.liste);
  }
}
