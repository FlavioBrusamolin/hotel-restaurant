import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { PratosProvider } from '../../providers/pratos/pratos';
import { PedidosProvider } from '../../providers/pedidos/pedidos';

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  pratos: any[];
  userNome: string;
  userQuarto: string;
  pratosort: [{ nome: string, descricao: string, valor: string, file: string }];
  pedido: Pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private pratoProvider: PratosProvider, private pedidoProvider: PedidosProvider, private clienteProvider: ClientesProvider) {
    this.pedido = new Pedido();   
  }

  ionViewDidEnter() {
    this.pratos = [];
    this.listarPratos();
    this.buscarCliente();
  }

  listarPratos() {
    this.pratoProvider.listarPratos()
      .then((result: any) => {
        this.pratosort = result.sort((a, b) => {
          return ('' + a.nome).localeCompare(b.nome);
        });
        this.pratos = this.pratosort;
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os pratos do cardápio. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  doRefresh(refresher) {
    this.pratoProvider.listarPratos()
      .then((result: any) => {
        this.pratosort = result.sort((a, b) => {
          return ('' + a.nome).localeCompare(b.nome);
        });
        this.pratos = this.pratosort;
        refresher.complete();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar os pratos do cardápio. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }

  cadastrarPedido(pedido) {
    var email = this.clienteProvider.clienteEmail;
    var usuario = this.userNome;
    var quarto = this.userQuarto;
    var status = 'Aberto';
    this.pedidoProvider.cadastrarPedido(pedido.nome, pedido.descricao, pedido.valor, pedido.file, email, usuario, quarto, status)
      .then((result: any) => {
        this.toast.create({ message: 'Pedido adicionado ao carrinho.', position: 'botton', duration: 3000}).present();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao adicionar pedido ao carrinho.', position: 'botton', duration: 3000 }).present();
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

}

export class Pedido {
  nome: string;
  descricao: string; 
  valor: string; 
  file: string; 
  email: string;
  usuario: string;
  quarto: string;
  status: string;
}
