"use client";
import React, { useState, useEffect } from "react";
import { ProfileCard } from "../components/UserSettings/ProfileCard";
import "../components/css/ProfileCard.css";
import Cookies from 'js-cookie';

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const userid = Cookies.get('userid');

        if (!userid) {
            console.log("userid is not available.");
            return; 
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/getuserbyid/${userid}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const userData = await response.json();
                setUser(userData);
                //console.log(user.userid);
                console.log("Fetched User:", userData); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userid = Cookies.get('userid');
        console.log(userid);
        try {
            const response = await fetch(`/api/updateuser/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bio, status }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);  // Update local user state with new data
                console.log('Update successful');
            } else {
                throw new Error("Failed to update user");
            }
            
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    return (
        <div style={{ padding: "20px", maxWidth: "300px", margin: "auto" }}>
            {user ? (
                <>
                    <ProfileCard 
                        imageSrc={user.userImage}
                        primaryText={user.status || "Status"}
                        secondaryText={user.bio || "Bio"}
                        primaryTextColor="#333333"
                        secondaryTextColor="#666666"
                        className=""
                    />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Bio:
                            <textarea value={bio} onChange={handleBioChange} />
                        </label>
                        <label>
                            Status:
                            <input type="text" value={status} onChange={handleStatusChange} />
                        </label>
                        <button type="submit">Submit Changes</button>
                    </form>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
