import { FETCH_PLAYERS_SUCCESS } from './constants';

export default function playerIds(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return action.payload.data.players.map((player) => player.id);
    default:
      return state;
  }
}
