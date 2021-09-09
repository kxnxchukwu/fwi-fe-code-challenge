import cn from 'classnames';

import styles from './PlayerTableHeader.module.scss';

export default function PlayerTableHeader() {
  return (
    <thead>
      <tr>
        <th className={cn(styles.cell, styles.avatar)} />
        <th className={cn(styles.cell, styles.player)}>Player</th>
        <th className={cn(styles.cell, styles.winnings)}>Winnings</th>
        <th className={cn(styles.cell, styles.country)}>Country</th>
      </tr>
    </thead>
  );
}
