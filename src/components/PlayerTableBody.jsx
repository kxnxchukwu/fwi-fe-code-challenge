import { useRouter } from 'next/router';
import Flag from 'react-world-flags';
import Image from 'next/image';
import Avatar from './Avatar';
import styles from './PlayerTableBody.module.scss';

export default function PlayerTableBody({players, handleDelete}) {
  const router = useRouter();

  const handleClick = (event, id) => {
    event.preventDefault();
    router.push(`/player/${id}`);
  };


  return (
    <tbody className={styles.tbody}>
      {players.map(({ id, name, winnings, country, imageUrl }) => (
        <tr key={id} className={styles.row}>
          <td className={styles.avatar}>
            <Avatar src={imageUrl} />
          </td>
          <td>{name}</td>
          <td className={styles.winnings}>
            {winnings.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </td>
          <td>
            <div className={styles.country}>
              <Avatar small className={styles.countryAvatar}>
                <Flag code={country} />
              </Avatar>
              {country}
            </div>
          </td>
          <td className={styles.buttonsBarContainer}>
            <button onClick={(event) => handleClick(event, id)}>
              <Image
                src={'/icons/open.svg'}
                alt="Open In a New Tab Icon"
                width={'36px'}
                height={'36px'}
              />
            </button>
            <button onClick={(event) => handleDelete(event, id)}>
              <Image
                src={'/icons/delete.svg'}
                alt="Delete Icon"
                width={'36px'}
                height={'36px'}
              />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}