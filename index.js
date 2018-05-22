let Players = require('./modules/Players');

let options = {
  format: 'json'
};

let players = new Players(options);
console.log(players.getAll());
