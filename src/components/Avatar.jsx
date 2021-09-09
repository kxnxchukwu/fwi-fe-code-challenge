/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';

import styles from './Avatar.module.scss';

export default function Avatar({ src, small, children, className }) {
  return (
    <span className={cn(styles.avatar, small && styles.small, className)}>
      {children || <img alt="" src={src} />}
    </span>
  );
}
