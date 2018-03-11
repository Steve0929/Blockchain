var firebase = require('firebase');
var admin = require('firebase-admin');
const CRYPTO = require('crypto-js/sha256');
var express = require("express");
var app = express();
var server = require ('http').createServer(app);
var io = require ('socket.io').listen(server);
var latestChain = [];


app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);
console.log('SERVIDOR FUNCIONANDO');

app.get('/', function(req, res){
            res .sendFile(__dirname + '/piece.html');

          });

////Firebase init
var serviceAccount = "./public/firebase/BlockChain-f3f006df8107.json";
var serviceAccountApp = "./public/BlockChain-01f31a3d3f3a.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blockchain-79321.firebaseio.com/'
});

firebase.initializeApp({
  serviceAccount: serviceAccountApp,
  databaseURL: 'https://blockchain-79321.firebaseio.com/'
});
//End of Firebase init

//Socket.io
conexiones = [];
io.sockets.on('connection', function(socket){
    conexiones.push(socket);
    console.log("Conectado: %s sockets conectados", conexiones.length);

  //desconexion
  socket.on('disconnect',function(data){
  conexiones.splice(conexiones.indexOf(socket),1);
  console.log('Desonectado: %s sockets conectados',conexiones.length);
                          });

  socket.on('send_block',function(data){
  //console.log("pushing "+JSON.stringify(data));
  pushValidBlock(data);
                          });

});


//db
function gotData(data){
let index = data.child('index').val();
let timestamp = data.child('timestamp').val();
let hash = data.child('hash').val();
let previousHash = data.child('previousHash').val();
let nonce = data.child('nonce').val();

blocks[0] =data.val();
console.log(blocks[0]);
console.log(blocks[0].data);
if(hash == blockObj.previousHash){//pushValidBlock();}
  }
}

function err(error){
  console.log("Error "+err);
}

//var genesis = firebase.database().ref("blockChain/GenesisBlock/");
//genesis.on('value', gotData, err);
var blockChain = firebase.database().ref("blockChain");
var blocks = [];


blockChain.on('value', getCurrentChain , err);


function pushValidBlock(block){
  if(block.previousHash !== latestChain[latestChain.length-1].hash){
    console.log("Invalid previous hash");
    }
  if(block.index !== (latestChain[latestChain.length-1].index)+1){
    console.log("Invalid index of the block");
    }
  else if(block.previousHash == latestChain[latestChain.length-1].hash && block.index == (latestChain[latestChain.length-1].index)+1){
    blockChain.push(block);
    console.log("Block added");
    io.sockets.emit('draw_mined_block' );
  }

}


function getCurrentChain(data){
  var gotLatestChain = data.val();
  latestChain = [];
  var keys = Object.keys(gotLatestChain);
  var reverse =  keys.length;
  for (var i = 0; i < keys.length; i++) {
       reverse--;
       var k = keys[i];
       latestChain[i] = gotLatestChain[k];
  }
  //console.log(latestChain);
  io.sockets.emit('Current_blockChain', latestChain);
  app.get("/getLatestChainOnStart", function(req, res) {
        res.send(latestChain);
            })
}
