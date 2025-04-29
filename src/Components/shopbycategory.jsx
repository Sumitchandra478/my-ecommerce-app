import React from 'react';
import styles from '../styles/shopbycategory.module.css';
import { NavLink } from 'react-router-dom';

function Shopbycategory() {
  return (
    <>
      <div className={styles.category2}>
        <div className={styles.parent} id="showbycategory">
          <h2>Shop by Category</h2>
          <div  className={styles.grid}>
            <NavLink to='electronicsItems' className={`${styles.common} ${styles.electronics}`}>
              <img src="https://i.postimg.cc/bwyvpsd5/electronics.jpg" />
              <h3>Electronics</h3>
              <p className="text-primary font-weight-bold">Flat 25% off</p>
            </NavLink>

            <NavLink to='fashionItems' className={`${styles.common} ${styles.Fashion}`}>
              <img src="https://i.postimg.cc/prKdXjDw/clothe-store.jpg" />
              <h3>Fashion</h3>
              <p className="text-primary font-weight-bold">Lowest price of the year</p>
            </NavLink>

            <NavLink to='sportsItems' className={`${styles.common} ${styles.Sports}`}>
              <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2018/04/13195733/130418_SportsStores_07-600x400.jpg" />
              <h3>Sports</h3>
              <p className="text-primary font-weight-bold">Flat 20% off</p>
            </NavLink>

            <NavLink to= 'decorItems' className={`${styles.common} ${styles.decor}`}>
              <img src="https://i.postimg.cc/hvckT7FW/home-decor.jpg" />
              <h3>Home Decor</h3>
              <p className="text-primary font-weight-bold">HDFC card discount:15%</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopbycategory;
