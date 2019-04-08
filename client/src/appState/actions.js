import { FETCH_PLAYERS_SUCCESS } from './constants';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}
