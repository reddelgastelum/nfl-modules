let Players = require('./modules/Players');
let Liveupdate = require('./modules/Liveupdate');

// This game has an interception 2017123101

// Get current ranked players from NFL.com
let players = new Players({format:'json'});

// This is a test eid for the liveupdate url
let eid = '2017123100';

// Create a Liveupdate object and get a response
let lu = new Liveupdate(eid);
let p = lu.getStats();


console.log(p.players);
