import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ClientesProvider } from '../../providers/clientes/clientes';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  user: string;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, private clienteProvider: ClientesProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.buscarCliente();
  }

  buscarCliente() {
    var email = this.clienteProvider.clienteEmail;
    this.clienteProvider.buscarCliente(email)
      .then((result: any) => {
        this.user = result.nome;
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao buscar usuario logado. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  exit() {
    let nav = this.app.getRootNav();
    nav.setRoot(HomePage);
  }

}
