import React from 'react'
import items from '../JSONFILES/electronics.json'
import ItemsDisplay from './itemsDisplay'

function Electronics() {
    const message='Explore Our Electronics Collection 📱'
  return (
    <ItemsDisplay items={items} message={message}/>
  )
}

export default Electronics