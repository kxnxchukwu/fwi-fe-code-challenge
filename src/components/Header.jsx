import styles from './Header.module.scss';
import Link from "next/link"
import CloudColors from '../assets/cloud-color.svg';
import CloudEffects from '../assets/cloud-effects.svg';

export default function Header() {
  return (
    <header id="main-header" className={styles.header}>
      <div className={styles.logoAndTitle}>
      <div className={styles.logo}>
        <CloudColors className={styles.cloudColors} />
        <CloudEffects className={styles.cloudEffects} />
      </div>
      <h1 className={styles.title}>FWI Poker Challenge</h1>
      </div>
      <div className={styles.createPlayerLink}>
      <Link href={"/player/create"}>
      <a className={styles.link}>
        <h3>Create New Player</h3>
      </a>
      </Link>
      </div>
    </header>
  );
}