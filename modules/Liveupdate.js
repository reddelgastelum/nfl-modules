let request = require('sync-request');
let Players = require('./Players');

class Liveupdate {
  constructor(eid) {
    this.eid = eid;
    this.url = 'http://www.nfl.com/liveupdate/game-center/'+ this.eid +'/'+ this.eid +'_gtd.json';
    this.response = request('GET', this.url);
  }

  getResponse() {
    if (this.response.statusCode === 200) {
      return JSON.parse(this.response.getBody());
    }
  }

  getStats() {
    let response = this.getResponse();
    let players = new Players({format:'json'});
    let sides = ['home', 'away'];
    for (let side of sides) {
      let stats = response[this.eid][side]['stats'];
      let categories = Object.keys(stats);
      categories.pop();
      for (let category of categories) {
        let playerIds = Object.keys(stats[category]);
        for (let playerId of playerIds) {
          let player = players.getOne(playerId);
          if (player !== undefined) {
            players.update(playerId, category, stats[category][playerId]);
          }
        }
      }
    }
    return players;
  }
}

// let lu = new Liveupdate('2018080251');
// console.log(lu.getResponse());

module.exports = Liveupdate;
