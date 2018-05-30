let parser = require('xml-js');
let request = require('sync-request');

class Scorestrip {
  constructor() {
    this.url = "http://www.nfl.com/liveupdate/scorestrip/ss.xml";
  }

  getRequest() {
    let xml = request('GET', this.url).getBody().toString();
    return JSON.parse(parser.xml2json(xml)).elements[0].elements[0].elements;
  }

  getEids() {
    let eids = [];
    for (let game of this.getRequest()) {
      eids.push(game.attributes.eid);
    }
    return eids;
  }
}

module.exports = Scorestrip;
