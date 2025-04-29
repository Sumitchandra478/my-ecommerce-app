import React from 'react'
import items from '../JSONFILES/sports.json'
import ItemsDisplay from './itemsDisplay'

function Sports() {
    const message='Gear Up at Our Sports Store 🏀'
  return (
    <ItemsDisplay items={items} message={message}/>
  )
}

export default Sports