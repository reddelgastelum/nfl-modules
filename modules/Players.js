let request = require('sync-request');
let Liveupdate = require('./Liveupdate');
let Scorestrip = require('./Scorestrip');

class Players {
  constructor(options) {
    this.season = options.season !== undefined ? options.season : "";
    this.count = options.count !== undefined ? options.count : "";
    this.offset = options.offset !== undefined ? options.offset : "";
    this.format = options.format !== undefined ? options.format : "";

    this.url = 'http://api.fantasy.nfl.com/v1/players/editordraftranks?season='+ this.season +'&format='+ this.format;

    this.players = this.getAll();
    this.addBlankStats();
  }

  getRequest(offset) {
    let url = this.url +'&count=100&offset='+ offset;
    let body = JSON.parse(request('GET', url).getBody());

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

  addBlankStats() {
    let players = this.players;
    for (let player of players) {
      player.passing = { name: '', att: 0, cmp: 0, yds: 0, tds: 0, ints: 0, twopta: 0, twoptm: 0};
      player.rushing = { name: '', att: 0, yds: 0, tds: 0, lng: 0, lngtd: 0, twopta: 0, twoptm: 0};
      player.receiving = { name: '', rec: 0, yds: 0, tds: 0, lng: 0, lngtd: 0, twopta: 0, twoptm: 0 };
      player.fumbles = { name: '', tot: 0, rcv: 0, trcv: 0, yds: 0, lost: 0 };
      player.kicking = { name: '', fgm: 0, fga: 0, fgyds: 0, totpfg: 0, xpmade: 0, xpmissed: 0, xpa: 0, xpb: 0, xptot: 0 };
      player.punting = {};
      player.kickret = { name: '', ret: 0, avg: 0, tds: 0, lng: 0, lngtd: 0 };
      player.puntret = { name: '', ret: 0, avg: 0, tds: 0, lng: 0, lngtd: 0 };
      player.defense = { name: '', tkl: 0, ast: 0, sk: 0, int: 0, ffum: 0 };
    }
  }

  getOne(gsisPlayerId) {
    let players = this.players;
    for (let player of players) {
      if (player.gsisPlayerId === gsisPlayerId) {
        return player;
      }
    }
  }

  updateOne(gsisPlayerId, category, obj) {
    let i;
    for (i = 0; i < this.players.length; i++) {
      if (this.players[i].gsisPlayerId === gsisPlayerId) {
        this.players[i][category] = obj;
      }
    }
  }

  updateGame(eid) {
    let liveupdate = new Liveupdate(eid);
    let stats = liveupdate.getStats();
    for (let stat of stats) {
      for (let category in stat) {
        for (let playerId in stat[category]) {
          let player = this.getOne(playerId);
          if (player !== undefined) {
            this.updateOne(playerId, category, stat[category][playerId]);
          }
        }
      }
    }
    return this.players;
  }

  updateAll() {
    let scorestrip = new Scorestrip();
    let eids = scorestrip.getEids();
    for (let eid of eids) {
      this.updateGame(eid);
    }
    return this.players;
  }

  getFantasyPoints(options) {
    let players = this.updateAll();
    let result = {};
    for (let player of players) {
      result[player.gsisPlayerId] = {name: player.firstName + ' ' + player.lastName ,stats: options.passingyds * player.passing.yds};
    }
    return result;
  }
}

module.exports = Players;
