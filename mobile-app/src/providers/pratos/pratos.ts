import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PratosProvider {
  private API_URL = 'http://localhost:9000/pratos'

  constructor(public http: Http) {}

  listarPratos() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL)
        .subscribe((result: any) => {
          return resolve(result.json());
        },
        (error) => {
          reject(error.json());
        })
    });
  }

}
