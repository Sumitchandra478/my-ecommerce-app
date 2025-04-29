import React from 'react';
import styles from '../styles/featuredProducts.module.css';
import items from '../JSONFILES/featuredProducts.json'
import { useNavigate } from 'react-router-dom';
function FeaturedProducts() {
  const navigate=useNavigate()
  const handleSubmit=(product)=>{
    const productData={description:product.description,image:product.img,price:product.price,name:product.name}
    localStorage.setItem('individualItem',JSON.stringify(productData))
    navigate('/itemDetails')
  }
  return (
    <>
     <div className={styles.category2}>
        <div className={styles.parent}>
          <h2>Featured Products</h2>
          <div className={styles.grid}>
            {items.map((item)=>(
                <div key={item.name} className={styles.product}
                onClick={()=>handleSubmit(item)}
                >
                    <img src={item.img} />
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                 </div>
            ))}
          
            
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
