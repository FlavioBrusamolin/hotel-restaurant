import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientesProvider {
  private API_URL = 'http://localhost:9000/clientes'
  public clienteEmail:string = "";

  constructor(public http: Http) {}

  cadastrarCliente(nome: string, email: string, cpf: number, quarto: number, senha: string) {
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome,
        email: email,
        cpf: cpf,
        quarto: quarto,
        senha: senha
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

  autenticarCliente(email: string, senha: string) {
    return new Promise((resolve, reject) => {
      var auth = {
        email: email,
        senha: senha
      };

      this.http.post(this.API_URL + '/auth', auth)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        })
    });
  }

  buscarCliente(email: string) {
    return new Promise((resolve, reject) => {
      var user = {
        email: email
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
