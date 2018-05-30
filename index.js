let Players = require('./modules/Players');

// This game has an interception 2017123101

// Get current ranked players from NFL.com
let players = new Players({format:'json'});

let scoringOptions = {
  passingyds: 0.04
};
console.log(players.getFantasyPoints(scoringOptions));
