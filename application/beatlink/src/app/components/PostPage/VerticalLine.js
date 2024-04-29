import React from 'react'

export function VerticalLine () {
  return (
    <svg
      width='1px'
      height='500px'
      viewBox={`0 0 1 500`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line x1='0.5' x2='0.5' y2='1000px' stroke='#D3D3D3' />
    </svg>
  )
}
