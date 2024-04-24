import React from 'react'
import { ProfileCard } from '../PostPage/ProfileCard'
import '../css/CommentCard.css'

export function CommentCard ({ username, comment, imageSrc }) {
  return (
    <div>
      <ProfileCard
        imageSrc={imageSrc}
        primaryText={username}
        secondaryText={comment}
        primaryTextColor={'grey'}
        secondaryTextColor={'black'}
        className={'comment-profile-picture'}
      />
      <LineSeparator />
    </div>
  )
}

function LineSeparator () {
  return (
    <svg
      width='298'
      height='1'
      viewBox='0 0 298 1'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line y1='0.5' x2='298' y2='0.5' stroke='#D3D3D3' strokeOpacity='0.5' />
    </svg>
  )
}
