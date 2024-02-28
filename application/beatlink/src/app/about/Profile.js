import React from 'react';
import Image from 'next/image';
import "../../../public/css/zuby.css"

const Profile = ({ name, image, description }) => {
    return (
        <>
            <a href="/">
                <button>&larr; Back</button>
            </a>
            <h1>{name}</h1>
            <h2>
                <Image src={image} alt={name} width={200} height={200} className='zuby_image' />
            </h2>
            <p>
                {description}
            </p>
        </>
    );
};

export default Profile;