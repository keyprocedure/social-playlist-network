"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import BackButton from "../components/UserSettings/BackButton";
import "../components/css/UserSettings.css";
import Cookies from 'js-cookie';

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const userid = Cookies.get('userid');

        if (!userid) {
            //console.log("userid is not available.");
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
                //console.log("Fetched User:", userData);
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
        //console.log(userid);

        // Use the existing user data if new data is not provided
        const payload = {
            bio: bio !== '' ? bio : user.bio,
            status: status !== '' ? status : user.status,
        };

        try {
            const response = await fetch(`/api/updateuser/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); 
                //console.log('Update successful');
                setBio('');
                setStatus('');
            } else {
                throw new Error("Failed to update user");
            }

        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <Navbar />
            <BackButton width="24" height="24" />
            <div className="container">
                <div className="header">User Settings</div>

                <img
                    src={user?.userImage || "/images/default_image.jpg"}
                    alt="Profile"
                    className="profile-image"
                />

                <button className="button">Update Profile Image</button>

                <div className="current-info">
                    <p className="info-label">Status:</p>
                    <p className="current-status">{user?.status || "Your status goes here."}</p>
                    <p className="info-label">Bio:</p>
                    <p className="current-bio">{user?.bio || "Your bio goes here."}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Status:
                        <input
                            className="input"
                            type="text"
                            placeholder="Update Status"
                            value={status}
                            onChange={handleStatusChange}
                        />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Bio:
                        <textarea
                            className="textarea"
                            placeholder="Update Bio"
                            value={bio}
                            onChange={handleBioChange}
                        />
                    </label>
                    <button className="button button-center" type="submit">Submit Changes</button>
                </form>

            </div>
        </>
    );
}