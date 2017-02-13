const redux = require('redux');

function reducer(state = {
  players: [],
  matches: []
}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
  }

  return state;
}

const actions = {
  setState(state) {
    return {
      type: 'SET_STATE',
      state
    };
  }
};

module.exports = {
  store: redux.createStore(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f),
  reducer: reducer,
  actions: actions
};
