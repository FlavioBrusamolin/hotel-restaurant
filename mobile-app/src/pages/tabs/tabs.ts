import { Component } from '@angular/core';

import { PedidosPage } from '../pedidos/pedidos';
import { CardapioPage } from '../cardapio/cardapio';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PedidosPage;
  tab2Root = CardapioPage;
  tab3Root = ConfiguracoesPage;

  constructor() {

  }
}
