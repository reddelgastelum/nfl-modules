let Players = require('./modules/Players');
let Liveupdate = require('./modules/Liveupdate');

let lu = new Liveupdate('2012020500');
console.log(lu.getResponse()['2012020500']['home']['stats']);
