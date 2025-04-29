import React from 'react';
import { useNavigate } from 'react-router-dom'; // optional if using routing
import productGroups from '../JSONFILES/productGroups.json'
import { useDispatch } from 'react-redux';
// import { addIndividualProducts } from '../ItemSlice/ItemsSlice';
import styled from 'styled-components';

let HoverEffect=styled.div`
&:hover{
 background-color:#efefef;
 color:#000;
 font-weight:bold;
  transform: scale(1.01);
}
`

function ItemsYouMayLike() {
  const navigate = useNavigate(); // optional
    const dispatch=useDispatch()
 

  const handleProductClick = (product) => {
    const productData={description:product.description,image:product.img,price:product.price,name:product.name}
    // dispatch(addIndividualProducts(productData))
    localStorage.setItem('individualItem',JSON.stringify(productData))
    navigate('/itemDetails')
  };
//displaying items from json to home page
  return (
    <div className='text-center mx-auto' style={{ width: '90vw' }}>
      <div className='row' style={{ backgroundColor: '#FFFFFF' }}>
        {Object.entries(productGroups).map(([sectionTitle, items]) => (
          <div className='col-md-4' key={sectionTitle}>
            <div className='row'>
              <h4 className="my-3">{sectionTitle}</h4>
              {items.map((item, index) => (
                <div className='col-md-6 mb-3' key={index}>
                  <HoverEffect
                    className="card text-center shadow-sm"
                    style={{ height: '240px', cursor: 'pointer' }}
                    onClick={() => handleProductClick(item)}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ objectFit: 'cover', height: '150px' }}
                    />
                    <h6 className='card-text px-2 mt-2' style={{ fontSize: '13px' }}>{item.name}</h6>
                    <p className='text-success fw-semibold '>₹{item.price}</p>
                  </HoverEffect>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsYouMayLike;
