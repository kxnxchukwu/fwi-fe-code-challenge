import styles from './Header.module.scss';

import CloudColors from '../assets/cloud-color.svg';
import CloudEffects from '../assets/cloud-effects.svg';

export default function Header() {
  return (
    <header id="main-header" className={styles.header}>
      <div className={styles.logo}>
        <CloudColors className={styles.cloudColors} />
        <CloudEffects className={styles.cloudEffects} />
      </div>
      <h1 className={styles.title}>FWI Poker Challenge</h1>
    </header>
  );
}
