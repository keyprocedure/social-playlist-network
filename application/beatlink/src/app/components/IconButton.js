import React from 'react'
import './css/IconButton.css'
import { IconContext } from 'react-icons'

export function IconButton ({ icon, onClick, contextValue }) {
  return (
    <IconContext.Provider value={contextValue}>
      <button onClick={onClick} className='icon-button'>
        {icon}
      </button>
    </IconContext.Provider>
  )
}
