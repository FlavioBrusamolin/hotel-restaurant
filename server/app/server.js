var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');
require('dotenv-safe').load();

var app = express();

var mongoURL = process.env.DB_URL;

var conn = mongoose.createConnection(mongoURL);
mongoose.connect(mongoURL, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('imagens');
})

var storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'imagens'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('localhost:80/kitchenWeb/#!/menu');
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.lenght === 0) {
      return res.status(404).json({
        err: 'Nao existem arquivos salvos'
      });
    }
    return res.json(files);
  });
});

app.get('/images/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.lenght === 0) {
      return res.status(404).json({
        err: 'Esse arquivo nao existe'
      });
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Nao é uma imagem'
      })
    }
  });
});

var usuarioCtrl = require('./usuario/Ctrl');
var clienteCtrl = require('./cliente/Ctrl');
var pratoCtrl = require('./prato/Ctrl');
var pedidoCtrl = require('./pedido/Ctrl');

app.post('/usuarios', usuarioCtrl.autenticar);

app.post('/clientes', clienteCtrl.cadastrar);
app.post('/clientes/auth', clienteCtrl.autenticar);
app.post('/clientes/user', clienteCtrl.buscar);

app.get('/pratos', pratoCtrl.listar);
app.post('/pratos', pratoCtrl.cadastrar);
app.post('/pratos/excluir', pratoCtrl.excluir);

app.post('/pedidos', pedidoCtrl.cadastrar);
app.get('/pedidos', pedidoCtrl.listar)
app.post('/pedidos/user', pedidoCtrl.buscar);
app.post('/pedidos/editar', pedidoCtrl.editar);

app.listen(9000, function () {
  console.log('Kitchen API');
});
