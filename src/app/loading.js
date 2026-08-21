import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.preloader} role="status" aria-label="Loading">
      <div className={styles.dots} aria-hidden="true">
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}
