import React from 'react';
import fetch from 'jest-fetch-mock';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createStore } from '../../appState/store';

import PlayerTable from '../PlayerTable';

function renderWithStore(ui) {
  const store = createStore();
  return render(ui, {
    wrapper: function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>;
    },
  });
}

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

const PLAYERS = [PLAYER_1, PLAYER_2];

beforeEach(() => {
  fetch.resetMocks();
});

describe('PlayerTable', () => {
  it('should correctly display all players', async () => {
    fetch.mockResponse(
      JSON.stringify({
        from: 0,
        size: -1,
        total: 2,
        items: PLAYERS,
      })
    );
    const { getByRole, getAllByRole } = renderWithStore(<PlayerTable />);

    expect(getByRole('table')).toBeInTheDocument();
    await waitFor(() => expect(getAllByRole('row')).toHaveLength(3));

    expect(() => getByRole('cell', { name: 'Player 1' })).not.toThrow();
    expect(() => getByRole('cell', { name: '$10,000.00' })).not.toThrow();

    expect(() => getByRole('cell', { name: 'Player 2' })).not.toThrow();
    expect(() => getByRole('cell', { name: '$50,000.00' })).not.toThrow();
  });

  it.todo('should allow sorting by clicking on the specific table headers');
  it.todo('should paginate the players');
});
