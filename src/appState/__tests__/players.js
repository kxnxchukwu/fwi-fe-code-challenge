import reducer, { fetchAllPlayers, PLAYERS_INITIAL_STATE } from '../players';

const PLAYER_1 = {
  id: 'player-1-id',
  name: 'Player 1',
  country: 'US',
  winnings: 10000,
  imageUrl: 'https://i.pravatar.cc/40?u=player-1-id',
};
const PLAYER_2 = {
  id: 'player-2-id',
  name: 'Player 2',
  country: 'US',
  winnings: 50000,
  imageUrl: 'https://i.pravatar.cc/40?u=player-2-id',
};

describe('reducer', () => {
  it('should update players in state after fetching all players', () => {
    const state1 = reducer(undefined, { type: 'INIT' });
    expect(state1).toEqual(PLAYERS_INITIAL_STATE);

    const state2 = reducer(state1, fetchAllPlayers.pending('request-id'));
    expect(state2).toEqual(PLAYERS_INITIAL_STATE);

    const payload = {
      size: -1,
      from: 0,
      total: 2,
      items: [PLAYER_1, PLAYER_2],
    };
    const state3 = reducer(
      state2,
      fetchAllPlayers.fulfilled(payload, 'request-id')
    );
    expect(state3).toEqual({
      ids: ['player-1-id', 'player-2-id'],
      entities: {
        'player-1-id': PLAYER_1,
        'player-2-id': PLAYER_2,
      },
    });
  });

  it.todo('should add new players into state after creating a player');
  it.todo('should modify an existing player after patching a player');
  it.todo('should remove players from state after deleting a player');
});
