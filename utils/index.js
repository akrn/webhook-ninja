const moniker = require('moniker');


const MAX_LENGTH = 5;
const SYMBOLS = 'abcdefghijklmnopqrstuvwxyz1234567890';
const monikerGenerator = moniker.generator([moniker.adjective, moniker.adjective, moniker.noun]);


module.exports.generateId = function() {
  return Array.from(new Array(MAX_LENGTH)).map(_ => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]).join('');
}

module.exports.generateSymbolicId = function() {
  return monikerGenerator.choose();
}
