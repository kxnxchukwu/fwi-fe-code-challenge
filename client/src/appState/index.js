import { combineReducers } from 'redux';

import playerIds from './playerIds';
import players from './players';

export default combineReducers({
  playerIds,
  players,
});
