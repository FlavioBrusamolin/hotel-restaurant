import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { PedidosProvider } from '../../providers/pedidos/pedidos';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  pedidos: any[];
  userNome: string;
  userQuarto: string;
  valorConta: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private pedidoProvider: PedidosProvider, private clienteProvider: ClientesProvider) {
  }

  ionViewDidEnter() {
    this.pedidos = [];
    this.valorConta = 0;
    this.listarPedidos();
    this.buscarCliente();
  }

  listarPedidos() {
    var email = this.clienteProvider.clienteEmail;
    this.pedidoProvider.listarPedidos(email)
      .then((result: any) => {
        this.pedidos = result;
        for(var i = 0; i < result.length; i++) {
          var valorPrato = parseFloat(result[i].valor);
          this.valorConta = this.valorConta + valorPrato;
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os pedidos. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  buscarCliente() {
    var email = this.clienteProvider.clienteEmail;
    this.clienteProvider.buscarCliente(email)
      .then((result: any) => {
        this.userNome = result.nome;
        this.userQuarto = result.quarto;
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao buscar usuario logado. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  doRefresh(refresher) {
    var email = this.clienteProvider.clienteEmail;
    this.pedidoProvider.listarPedidos(email)
      .then((result: any) => {
        this.pedidos = result;
        refresher.complete();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os pedidos. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

}
