const React = require('react');
const ReactDOM = require('react-dom');
const Glicko2 = require('glicko2').Glicko2;
const Elo = require('elo-calculator');

const { Provider, connect } = require('react-redux');
const { store } = require('../redux');

const calculators = {
  glicko: new Glicko2({
    tau: .5,
    rating: 1500,
    rd: 350,
    vol: .06
  }),
  elo: new Elo()
};

const { PropTypes } = React;

function getRatings(players, matches) {
  const playerObjects = players.reduce(function(players, player) {
    return Object.assign({}, players, {
      [player]: {
        elo: calculators.elo.createPlayer(),
        glicko: calculators.glicko.makePlayer()
      }
    })
  }, {});

  console.log(playerObjects);

  ['elo', 'glicko'].forEach(function(key) {
    const calculator = calculators[key];

    calculator.updateRatings(matches.map(function(match) {
      return [playerObjects[match[1]][key], playerObjects[match[0]][key], match[2]];
    }));
  });

  return playerObjects;
}

function App({
  players
}) {
  return (
    <div>
      { Object.keys(players).map(function(player) {
        return (
          <div>
            { `${player}: Glicko:  ${Math.round(players[player].glicko.getRating())} Elo: ${Math.round(players[player].elo.rating)}. Games played: ${players[player].elo.numberOfGamesPlayed}` }
          </div>
        )
      }) }
    </div>
  );
}

App.propTypes = {
  players: PropTypes.objectOf(PropTypes.shape({
    elo: PropTypes.shape({
      rating: PropTypes.number.isRequired,
      numberOfGamesPlayed: PropTypes.number.isRequired
    }).isRequired,
    glicko: PropTypes.shape({
      getRating: PropTypes.func.isRequired
    }).isRequired
  })).isRequired
};

function mapStateToProps(state) {
  return {
    players: getRatings(state.players, state.matches)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange(value) {
      dispatch(actions.handleChange(value))
    }
  };
}

ReactDOM.render(React.createElement(connect(mapStateToProps, mapDispatchToProps)(App), {
  store
}), document.querySelector('#app'));
