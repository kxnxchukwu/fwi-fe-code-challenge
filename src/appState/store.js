import { useMemo } from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import players from './players';

export function createStore(preloadedState) {
  return configureStore({
    preloadedState,
    reducer: combineReducers({
      players,
    }),
  });
}

export function useStore(initialState) {
  return useMemo(() => createStore(initialState), [initialState]);
}
