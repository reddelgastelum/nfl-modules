let Players = require('./modules/Players');
let Liveupdate = require('./modules/Liveupdate');

// This game has an interception 2017123101

// Get current ranked players from NFL.com
let players = new Players({format:'json'});

// This is a test eid for the liveupdate url
let eid = '2017123100';

let p = players.updateAll(eid);


console.log(p);
