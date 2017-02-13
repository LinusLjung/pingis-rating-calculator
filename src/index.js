const firebase = require('firebase');
const firebaseui = require('firebaseui');
const Glicko2 = require('glicko2').Glicko2;
const Elo = require('elo-calculator');

const { store, actions: { setState } } = require('./redux/');

const calculators = {
  glicko: new Glicko2({
    tau: .5,
    rating: 1500,
    rd: 350,
    vol: .06
  }),
  elo: new Elo()
};

const config = {
  apiKey: "AIzaSyAFaLy_FA2K9PiOXwtKHQpls95VWjs74gs",
  authDomain: "pingis-f5cb5.firebaseapp.com",
  databaseURL: "https://pingis-f5cb5.firebaseio.com",
  storageBucket: "pingis-f5cb5.appspot.com",
  messagingSenderId: "802331052996"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref('/').on('value', function(data) {
  console.log(data.val());
  store.dispatch(setState(data.val()))
});

require('./components/app.jsx');

/*
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

const players = ['Joel', 'Anders', 'Jonas', 'David', 'Linus', 'Johan', 'Pär', 'Zebbe', 'Daniel', 'Simon']
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
      createMatch(players, 'Linus', 'Daniel', 1, calculator),
      createMatch(players, 'David', 'Simon', 1, calculator),
      createMatch(players, 'Daniel', 'David', 0, calculator),
      createMatch(players, 'Linus', 'David', 1, calculator),
      createMatch(players, 'Daniel', 'Simon', 1, calculator),
      createMatch(players, 'David', 'Daniel', 0, calculator),
      createMatch(players, 'Joel', 'Anders', 0, calculator),
      createMatch(players, 'Joel', 'Johan', 1, calculator),
    ])
  });
}

updateRatings();

console.log(Object.keys(players).reduce(function(playerList, player) {
  return [
    ...playerList,
    `${player}: Glicko:  ${Math.round(players[player].glicko.getRating())} Elo: ${Math.round(players[player].elo.rating)}. Games played: ${players[player].elo.numberOfGamesPlayed}`
  ];
}, []));
*/
