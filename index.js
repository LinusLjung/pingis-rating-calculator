const Glicko2 = require('glicko2').Glicko2;
const Elo = require('elo-calculator');
const calculators = {
  glicko: new Glicko2({
    tau: .5,
    rating: 1500,
    rd: 350,
    vol: .06
  }),
  elo: new Elo()
};

const players = ['Joel', 'Anders', 'Jonas', 'David', 'Linus', 'Johan', 'Pär', 'Zebbe', 'Daniel']
  .reduce(function(players, player) {
    return Object.assign({}, players, {
      [player]: {
        glicko: calculators.glicko.makePlayer(),
        elo: calculators.elo.createPlayer()
      }
    });
  }, {});

function createMatch(players, challanger, defender, result, calculator) {
  return [players[defender][calculator], players[challanger][calculator], result];
}

function updateRatings() {
  ['elo', 'glicko'].forEach(function(calculator) {
    calculators[calculator].updateRatings([
      createMatch(players, 'Joel', 'Anders', 1, calculator),
      createMatch(players, 'Jonas', 'David', 1, calculator),
      createMatch(players, 'Linus', 'Jonas', 1, calculator),
      createMatch(players, 'Anders', 'Johan', 1, calculator),
      createMatch(players, 'Pär', 'Zebbe', 1, calculator),
      createMatch(players, 'Linus', 'Daniel', 1, calculator),
      createMatch(players, 'Linus', 'Daniel', 1, calculator)
    ])
  });
}

updateRatings();

console.log(Object.keys(players).reduce(function(playerList, player) {
  return [
    ...playerList,
    `${player}: Glicko:  ${Math.round(players[player].glicko.getRating())} Elo: ${Math.roundplayers[player].elo.rating}`
  ];
}, []));
