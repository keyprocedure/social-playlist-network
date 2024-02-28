import React from 'react';
import zubyPic from "../../../../public/images/zuby_image.jpg";
import Profile from '../Profile';

const Zuby = () => {
    return (
        <Profile name="Zuby Afzal" image={zubyPic} description=" My name is Zuby! I'm a senior studying CS at SFSU.
      I'm the back-end lead for the software development project in my CSC 648
      class.
      During my offtisme I play soccer and struggle through LeetCode problems.
      I'm looking forward to learning about software development and building
      soft skills working in a team." />
    );
};

export default Zuby;
