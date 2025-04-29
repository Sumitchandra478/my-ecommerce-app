import React from 'react'
import items from '../JSONFILES/decoration.json'
import ItemsDisplay from './itemsDisplay'

function Decoration() {
    const message=' 🎀 Discover Beautiful Decoration Items 🕯️'
  return (
    <ItemsDisplay items={items} message={message}/>
  )
}

export default Decoration