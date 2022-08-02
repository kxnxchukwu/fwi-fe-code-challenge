import { useEffect, useState } from 'react';
import PlayerTableBody from './PlayerTableBody';
import PlayerTableHeader from './PlayerTableHeader';
import styles from './PlayerTable.module.scss';

export default function PlayerTable() {

  const [players, setPlayers] = useState([]);
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    async function getAllPlayers() {
      try {
        const response = await fetch(`http://localhost:3000/api/players`, {
          method: 'GET',
        });
        const playersData = await response.json();
        setPlayers(playersData.items);
      } catch (error) {
          console.error("Error retrieving Players: ", error);
      }
    }
    
    getAllPlayers();

  }, []);
  
  /*const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]); */

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/players/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        try {
          const response = await fetch(`http://localhost:3000/api/players`, {
            method: 'GET',
          });
          const playersData = await response.json();
          setPlayers(playersData.items);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSort = async (event, value) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/players?sortBy=${value}&sortOrder=${order}`, {
            method: 'GET',
          });
          const playersData = await response.json();
          setPlayers(playersData.items);
          order === "asc" ? setOrder("desc") : setOrder("asc");
    } catch (error) {
      console.error({error})
    }
  }

  return (
    <table id="player-table" className={styles.table}>
      <PlayerTableHeader handleSort={handleSort} order={order} />
      <PlayerTableBody players={players} handleDelete={handleDelete} />
    </table>
  );
}