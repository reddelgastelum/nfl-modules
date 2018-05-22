let request = require('sync-request');

class Players {
  constructor(options) {
    this.season = options.season !== undefined ? options.season : "";
    this.count = options.count !== undefined ? options.count : "";
    this.offset = options.offset !== undefined ? options.offset : "";
    this.format = options.format !== undefined ? options.format : "";

    this.url = 'http://api.fantasy.nfl.com/v1/players/editordraftranks?season='+ this.season +'&format='+ this.format;

  }

  getRequest(offset) {
    let url = this.url +'&count=100&offset='+ offset;
    let response = request('GET', url);
    let body = JSON.parse(response.getBody());
    if (body.players.length !== 0) {
      return body.players;
    } else {
      return false;
    }
  }

  getAll() {
    let i;
    let players = [];
    for (i = 0; ; i += 100) {
      let response = this.getRequest(i);
      if (!response) {
        return players;
      } else {
        players = players.concat(response);
      }
    }
  }
}

module.exports = Players;
