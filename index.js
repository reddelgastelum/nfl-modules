let Players = require('./modules/Players');
let Liveupdate = require('./modules/Liveupdate');

// This game has an interception 2017123101

let players = new Players({format:'json'});

let playerArr = [];
let eid = '2017123100';
let lu = new Liveupdate(eid);
let stats = lu.getResponse()[eid]['away']['stats'];
let categories = Object.keys(stats);
for (let category of categories) {
  let categoryResults = stats[category];
  let playerKeys = Object.keys(categoryResults);
  for (let playerKey of playerKeys) {
    if (playerKey.startsWith('00')) {
      let player = players.getOne(playerKey);
      if (player !== undefined) {
        console.log(playerKey);
        console.log(category);
        console.log(categoryResults[playerKey]);
        players.update(playerKey, category, categoryResults[playerKey]);

      }
    }
  }
}
console.log(players.getOne('00-0027939'));

// console.log(playerArr);



// console.log(players.getOne('00-0026158'));
