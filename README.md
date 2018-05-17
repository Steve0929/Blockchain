# Blockchain
Interactive Blockchain is a Proof of concept which helps to visualize in a tridimensional space a Blockchain where users can add new blocks(data), see the hashing process and check the integrity of the chain.

### Adding a new block to the chain
Note that each block contains the following information:
* Index - The index of the block in the chain.
* Timestamp of the block creation.
* Previous Hash - The hash of the previous block in the chain.
* Data - The data used by an user to create the block.
* X,Y,Z position coordinates in the 3D space.
* Color.
* Hash - The hash of the block which is calculated using Secure Hash Algorithm Sha256.

In order to add a block to the chain the user needs to input a piece of data and then start the mining.
 ```sh
 calculateHash(){
        return Sha256.hash(this.nonce + this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
      }
``` 
Whenever a user adds a block to the chain, the changes will be reflected in real time. The new block will be rendered in the tridimensional space and any user will be able to check the data and hash of the added block. The position of the block on the environment and its color  will be determined randomly.



### Tech

* [socket.io] - Enables real-time bidirectional event-based communication.
* [Three.js] - Lightweight 3D library compatible with WebGl.
* [node.js] - Backend Server.
* [crypto-js] - JavaScript library of crypto standards.
* [firebase] - Realtime database.
* [Express] - node.js network app framework.




[node.js]: <http://nodejs.org>
[Three.js]: <https://threejs.org/>
[firebase]: <https://www.npmjs.com/package/firebase>
[express]: <http://expressjs.com>
[socket.io]: <https://socket.io>
[request]: <https://github.com/request/request>
[crypto-js]: <https://www.npmjs.com/package/crypto-js>
