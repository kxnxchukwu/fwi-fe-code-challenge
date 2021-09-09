import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllPlayers } from '../appState/players';
import PlayerTableBody from './PlayerTableBody';
import PlayerTableHeader from './PlayerTableHeader';
import styles from './PlayerTable.module.scss';

export default function PlayerTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  return (
    <table id="player-table" className={styles.table}>
      <PlayerTableHeader />
      <PlayerTableBody />
    </table>
  );
}
