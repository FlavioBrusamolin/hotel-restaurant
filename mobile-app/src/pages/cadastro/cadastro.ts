import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cliente: Cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private clienteProvider: ClientesProvider) {
    this.cliente = new Cliente();   
  }

  cadastrarCliente() {
    if(this.cliente.confirmasenha !== this.cliente.senha) {
      this.toast.create({ message: 'As senhas não conferem.', position: 'botton', duration: 3000}).present();
    }
    else {
      this.clienteProvider.cadastrarCliente(this.cliente.nome, this.cliente.email, this.cliente.cpf, this.cliente.quarto, this.cliente.senha)
        .then((result: any) => {
          this.toast.create({ message: 'Usuário cadastrado com sucesso.', position: 'botton', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((error: any) => {
          this.toast.create({ message: 'Erro ao cadastrar usuário.', position: 'botton', duration: 3000 }).present();
        });
    }
  }
}

export class Cliente {
  nome: string;
  email: string; 
  cpf: number; 
  quarto: number; 
  senha: string;
  confirmasenha: string;
}
