// components/AuthLink.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthLink = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const session = Cookies.get('session');
        setIsLogged(!!session); // Convert to boolean: true if session exists, false otherwise
    }, []);

    if (isLogged) {
        return <a href="/logout" className="nav-link-auth">LOGOUT</a>;
    } else {
        return <a href="/login" className="nav-link-auth">LOGIN</a>;
    }
};

export default AuthLink;