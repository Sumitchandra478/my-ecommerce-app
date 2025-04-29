import React from 'react'
import items from '../JSONFILES/fashion.json'
import ItemsDisplay from './itemsDisplay'
function Fashion() {
  const message='Explore Our Fashion Collection 👖'
  return (
  <ItemsDisplay items={items} message={message}/>
  )
}

export default Fashion