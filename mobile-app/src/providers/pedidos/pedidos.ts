import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PedidosProvider {
  private API_URL = 'http://localhost:9000/pedidos'

  constructor(public http: Http) {
  }

  cadastrarPedido(nome: string, descricao: string, valor: string, file: string, email: string, usuario: string, quarto: string, status: string) {
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome,
        descricao: descricao,
        valor: valor,
        file: file,
        email: email,
        usuario: usuario,
        quarto: quarto,
        status: status
      };

      this.http.post(this.API_URL, data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        })
    });
  }

  listarPedidos(email: string) {
    return new Promise((resolve, reject) => {
      var user = {
        email:email
      };

      this.http.post(this.API_URL + '/user', user)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        })
    });
  }

}
