const MAX_LENGTH = 5;
const SYMBOLS = 'abcdefghijklmnopqrstuvwxyz1234567890';


module.exports.generateId = function() {
  return Array.from(new Array(MAX_LENGTH)).map(_ => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]).join('');
}
