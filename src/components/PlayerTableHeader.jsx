import cn from 'classnames';

import styles from './PlayerTableHeader.module.scss';

import Image from "next/image";

export default function PlayerTableHeader({handleSort, order}) {
  return (
    <thead>
      <tr>
        <th className={cn(styles.cell, styles.avatar)} />
        <th className={cn(styles.cell, styles.player)} onClick={(event) => handleSort(event, "name")}>
        Player
        <Image
        src={`/icons/${order}.svg`}
        alt="Arrow Down Icon"
        width={'20px'}
        height={'20px'}
        />
        </th>
        <th className={cn(styles.cell, styles.winnings)} onClick={(event) => handleSort(event, "winnings")}>
        Winnings
        <Image
        src={`/icons/${order}.svg`}
        alt="Arrow Down Icon"
        width={'20px'}
        height={'20px'}
        />
        </th>
        <th className={cn(styles.cell, styles.country)} onClick={(event) => handleSort(event, "country")}>
        Country
        <Image
        src={`/icons/${order}.svg`}
        alt="Arrow Down Icon"
        width={'20px'}
        height={'20px'}
        />
        </th>
        <th className={cn(styles.cell, styles.country)}>Actions</th>
      </tr>
    </thead>
  );
}
