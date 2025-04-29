import React from 'react'
import { useState,useEffect } from 'react'
import styles from '../styles/ticketBook.module.css'
import classNames from 'classnames';
function TicketBook() {
  const [currentIndex,setCurrentIndex]=useState(0)
  const [prevIndex,setPrevIndex]=useState(null)

  useEffect(()=>{
   
    const interval=setInterval(()=>{
      setPrevIndex(currentIndex)
      setCurrentIndex((prev)=>(prev+1)%images.length)
    },3000);
    return ()=>clearInterval(interval)
  },[currentIndex])
  const images=[
    'https://media-hosting.imagekit.io/96e38b3753954ba4/final.jpg?Expires=1840477493&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=YuC4zS2FZyLco3W4Ver~tWngtMYPX887W7xKezopFjm74pNpqnX~P-lSYV06k4krYdRDw9ABAyVQctv5zKENfUX879laDrgcXAbwb~zllADvRFXE7EZ-0XukykLjxBfz5boVrQd5ECeRVo5hzcnBJHxz8dOwtSSO8~q3JrlcPd9X38ty1UQ84N4T0Wi1UYwz9eWMi7op0LkjIethJPMIkQqITW03Vvi14jz-ZJ1JNOfmIFfJJuYjGcHycm304Bco7M5yu8Nt3eCo8JH58mGnPn1yotb2WjYh9aQC5WoErX7JLDqwx6U9AsivuVd~EyJJxYDQE6mk-dkp87W1kCj7Qw__',
   'https://cmsimages.shoppersstop.com/watch_main_kv_web_e69d8346be/watch_main_kv_web_e69d8346be.png',
     'https://cmsimages.shoppersstop.com/dockers_web_68d5e6a2f3/dockers_web_68d5e6a2f3.png',
    'https://cmsimages.shoppersstop.com/WW_web_db1b8a41d2/WW_web_db1b8a41d2.png',
      'https://media-hosting.imagekit.io/3a569243e7034803/Screenshot%202025-04-29%20013754.png?Expires=1840478967&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=K36HSxEPs9ilZcs1JAYb1MFq9CVjN7G3VpMJlmXUP1GIL6R0haUJnaZpnuVRubomnsDW8HFQRmBapefMIQoLkl61aL0H4n8H9-DYUfxOaw~2w9VGSnf1ky8c7I0N~OFlbFY~R-5VhJPTJZdSZ3bKe~In51l3ScWdMhpf~~VWQ-qBTgVP~aG2lgxbrhJGFCxX0tbEAEz5-0V14Z-sSQe2rdd~MzBIrd47gEuAFdftp3GH3DA3XMkpcKzkbfLo~BnJHggUugCAScbPaT0cozfO~y1PRXu4xD7HsnvH50MjQ0IFJdc7B9Zjue2VqKirWGHNvAvAR~McuZKDXqlfQKPG4w__'
  ]
  return (
   <>
   <h2 className={classNames(styles.heading)}>Top Offers</h2>
   <div className={styles.parent}>
        
        <div className={styles.carouselContainer} >
              {/* <img style={{width:"100%",height:"280px",objectFit:"cover"}} src=""/> */}
              {(prevIndex!==null) && (
              <img key={`prev-${prevIndex}`} className={classNames(styles.carouselImage, styles.slideOut)} src={images[prevIndex]} style={{width:"100%",height:"270px", objectFit:"cover"}}/>
            ) }
              <img key={`current-${currentIndex}`} className={classNames(styles.carouselImage, styles.slideIn)} src={images[currentIndex]} style={{width:"100%",height:"270px",objectFit:"cover"}}/>
         </div>

              <div className={styles.indicator}>
               {images.map((_,i)=>(    
                i===prevIndex?    (   
                <span key={i} className={classNames(styles.dot,styles.active)}></span>):
              (  <span key={i} className={styles.dot}></span>)

               ))}
             
              </div>
      
        
    </div>
   </>
  )
}

export default TicketBook