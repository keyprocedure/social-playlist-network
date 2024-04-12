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
        // Fetch the username only once or when necessary if it changes.
        const username = Cookies.get('username');
        if (!username) {
            console.log("Username is not available.");
            return; // Exit the effect if no username is found.
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/getuser/${username}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const userData = await response.json();
                setUser(userData); // Set user data which should only change if the response changes
                //console.log(user.username);
                console.log("Fetched User:", userData); // Log the fetched user data
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
        const username = Cookies.get('username');
        console.log(username);
        try {
            const response = await fetch(`/api/updateuser/${username}`, {
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
