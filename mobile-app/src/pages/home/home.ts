import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CadastroPage, Cliente } from '../cadastro/cadastro';
import { TabsPage } from '../tabs/tabs';
import { ClientesProvider } from '../../providers/clientes/clientes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cliente: Cliente;

  constructor(public navCtrl: NavController, private toast: ToastController, private clienteProvider: ClientesProvider) {
    this.cliente = new Cliente();
  }

  ionViewDidEnter() {
    this.cliente.email = null;
    this.cliente.senha = null;
  }

  autenticarCliente() {
    this.clienteProvider.autenticarCliente(this.cliente.email, this.cliente.senha)
      .then((result: any) => {
        this.clienteProvider.clienteEmail = this.cliente.email;
        this.navCtrl.push(TabsPage);
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Usuário ou senha incorretos.', position: 'botton', duration: 3000 }).present();
        this.cliente.email = null;
        this.cliente.senha = null;
      });
  }

  novaconta() {
    this.navCtrl.push(CadastroPage);
  }

}
