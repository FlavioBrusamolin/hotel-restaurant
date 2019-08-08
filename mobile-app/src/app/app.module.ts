import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , enableProdMode} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { TabsPage } from '../pages/tabs/tabs'
import { PedidosPage } from '../pages/pedidos/pedidos'
import { CardapioPage } from '../pages/cardapio/cardapio'
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes'
import { ClientesProvider } from '../providers/clientes/clientes';
import { PratosProvider } from '../providers/pratos/pratos';
import { HttpModule } from '@angular/http';
import { SearchPipe } from '../pipes/search/search';
import { PedidosProvider } from '../providers/pedidos/pedidos';

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroPage,
    TabsPage,
    PedidosPage,
    CardapioPage,
    ConfiguracoesPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    TabsPage,
    PedidosPage,
    CardapioPage,
    ConfiguracoesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClientesProvider,
    PratosProvider,
    PedidosProvider
  ]
})
export class AppModule {}
