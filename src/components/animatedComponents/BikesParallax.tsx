import React from 'react';
import styles from './BikesParallax.module.css';

const BikesParallax = () => {
  return (
    <div className={styles.hero}>
      <div className={`${styles.parallaxLayer} ${styles.layer6}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.layer5}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.layer4}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.bike1}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.bike2}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.layer3}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.layer2}`}></div>
      <div className={`${styles.parallaxLayer} ${styles.layer1}`}></div>
    </div>
  );
};

export default BikesParallax;