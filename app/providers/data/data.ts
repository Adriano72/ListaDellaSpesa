import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
@Injectable()
export class Data {
    storage: Storage;
    constructor() {
        this.storage = new Storage(SqlStorage, { name: 'lista' });
    }
    getData(): Promise<any> {
        return this.storage.get('liste');
    }
    save(data): void {

        let saveData = [];
        //Remove observables
        data.forEach((lista) => {
            saveData.push({
                title: lista.title,
                items: lista.items
            });
        });
        let newData = JSON.stringify(saveData);
        this.storage.set('liste', newData);

    }
}
