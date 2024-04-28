import React from 'react'
import '../../../../public/css/zuby.css'
import yashPic from '../../../../public/images/yash_image.jpg'
import Profile from '../Profile'

const Yash = () => {
  return (
    <Profile
      name='Yash Bhadiyadra'
      image={yashPic}
      description="Hey Everyone! I'm Yash Bhadiyadra, hailing from India as an international student.
      I 'm currently pursuing Masters in Computer Science at SFSU. I'm usually calm and positive.
      I'm a Supporter for the software development project in my CSC 848 class.
      My genuine interest lies in Artificial Intelligence, particularly Generative AI, and I'm also passionate about exploring the vast landscape of Cloud Computing.
      In my free time, I enjoy exploring new places, trying diverse cuisines with friends, and immersing myself in the world of cricket – both watching and playing.
      Sci-fi movies are a favorite pastime, and I have a soft spot for anything related to cars."
    />
  )
}

export default Yash
