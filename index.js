const Glicko2 = require('glicko2').Glicko2;
const ranking = new Glicko2({
  tau: .5,
  rating: 1500,
  rd: 350,
  vol: .06
});

const players = ['Joel', 'Anders', 'Jonas', 'David', 'Linus', 'Johan', 'Pär', 'Zebbe', 'Daniel']
  .reduce(function(players, player) {
    return Object.assign({}, players, {
      [player]: ranking.makePlayer()
    });
  }, {});

function createMatch(players, challanger, defender, result) {
  return [players[defender], players[challanger], result];
}

const matches = [
  createMatch(players, 'Joel', 'Anders', 1),
  createMatch(players, 'Jonas', 'David', 1),
  createMatch(players, 'Linus', 'Jonas', 1),
  createMatch(players, 'Anders', 'Johan', 1),
  createMatch(players, 'Pär', 'Zebbe', 1),
  createMatch(players, 'Daniel', 'Linus', 0)
];

ranking.updateRatings(matches);

console.log(Object.keys(players).reduce(function(playerList, player) {
  return [
    ...playerList,
    `${player}: ${players[player].getRating()}`
  ];
}, []));
