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
