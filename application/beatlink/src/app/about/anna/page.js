import React from 'react';
import Image from 'next/image';
import "../../../../public/css/zuby.css"
import defaultPic from "../../../../public/images/default.jpg";
import Profile from '../Profile';

const Anna = () => {
    return (
        <Profile name="Anna Felipe" image={defaultPic} description="Hello, my name is Anna and I'm a Computer Science major at SFSU and the Front-End Lead on this project.
            I am a Bay Area native; born in San Francisco and raised in between the cities South San Francisco and Richmond. 
			Some of my hobbies include playing video games, working on cars and riding my motorycle. 
			I also really enjoy being outdoors, specifically camping, backpacking or overlanding in my Jeep. 
			This past summer, I backpacked to the peak of Mount Whittenberg and camped there overnight." />
    );
};

export default Anna;
