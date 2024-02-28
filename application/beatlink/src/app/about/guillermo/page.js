import React from 'react';
import defaultPic from "../../../../public/images/default.jpg";
import Profile from '../Profile';

const Guillermo = () => {
    return (
        <Profile name="Guillermo Alcantara" image={defaultPic} description="My name is Guillermo this is my last semester at SFSU and my role for our team is Scrum Master. 
        I like to spend time with family and friends on the weekends and play board games with my girlfriend.
        I am hoping to learn a lot from this class pursue a software engineering role after graduating." />
    );
};

export default Guillermo;
