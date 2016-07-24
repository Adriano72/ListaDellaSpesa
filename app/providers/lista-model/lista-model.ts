import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ChecklistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/checklist/checklist.html',
})
export class ListaModel {

    lista: any;
    listaObserver: any;

    constructor(public title: string, public items: any[]) {
        this.items = items;
        this.lista = Observable.create(observer => {
            this.listaObserver = observer;
        });
    }

    addItem(item): void {
        this.items.push({
            title: item,
            checked: false
        });
        this.listaObserver.next(true);
    }

    removeItem(item): void {

        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        156
        this.listaObserver.next(true);

    }

    renameItem(item, title): void {

        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items[index].title = title;
        }
        this.listaObserver.next(true);

    }

    setTitle(title): void {

        this.title = title;
        this.listaObserver.next(true);

    }

    toggleItem(item): void {

        item.checked = !item.checked;
        this.listaObserver.next(true);

    }
}
