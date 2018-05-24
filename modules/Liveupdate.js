let request = require('sync-request');

class Liveupdate {
  constructor(eid) {
    this.eid = eid;
    this.url = 'http://www.nfl.com/liveupdate/game-center/'+ this.eid +'/'+ this.eid +'_gtd.json';
    this.response = JSON.parse(request('GET', this.url).getBody());
  }

  getResponse() {
    return this.response;
  }
}

module.exports = Liveupdate;
