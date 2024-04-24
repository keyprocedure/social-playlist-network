import React from 'react'
import anthonyPic from '../../../../public/images/anthony_pic.jpg'
import Profile from '../Profile'

const Anthony = () => {
  return (
    <Profile
      name='Anthony Benjamin'
      image={anthonyPic}
      description='My name is Anthony B. and I am a senior at San Francisco State University. I am the team lead for this project. I enjoy playing video games, watching anime, and playing basketball.'
    />
  )
}

export default Anthony
