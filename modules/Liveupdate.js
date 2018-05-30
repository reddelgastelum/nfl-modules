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
    let statsArr = [];
    let sides = ['home', 'away'];
    for (let side of sides) {
      let stats = response[this.eid][side]['stats'];
      statsArr.push(stats);
    }
    return statsArr;
  }
}

// let lu = new Liveupdate('2018080251');
// console.log(lu.getResponse());

module.exports = Liveupdate;
