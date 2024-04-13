"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import BackButton from "../components/UserSettings/BackButton";
import "../components/css/UserSettings.css";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"
import checkSessionCookie from '../../../helpers/hooks/checkSessionCookie';

export default function SettingsPage() {
    const isLoading = checkSessionCookie();
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState('');
    const [status, setStatus] = useState('');
    const router = useRouter();

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
            // userImage: userImage !== '' ? userImage : user.userImage,
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

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            await deleteAccount();
        }
    };

    const deleteAccount = async () => {
        const userid = Cookies.get('userid');
        try {
            const response = await fetch(`/api/deleteuser/${userid}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log("Account deleted successfully.");
                router.push('/logout');
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleImageUpdate = async () => {

        console.log("Updated image URL: ", imageURL);
        const userid = Cookies.get('userid');
        try {
            const response = await fetch(`/api/updateuserimage/${userid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userImage: imageURL
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                console.log("Image updated successfully.");
                //router.push('/logout');
            } else {
                throw new Error("Failed to update user image");
            }
        } catch (error) {
            console.error("Failed to update user image:", error);
        }
        setShowModal(false);

    };

    const openModal = () => {
        console.log("Opening modal...");
        setShowModal(true);
    };
    const closeModal = () => setShowModal(false);

    return (
        <>
            <Navbar />
            <BackButton width="24" height="24" />
            {isLoading ? (
                <div></div>
            ) : (
                <div className="container">
                    <div className="header">User Settings</div>

                    <img
                        src={user?.userImage || "/images/default_image.jpg"}
                        alt="Profile"
                        className="profile-image"
                    />

                    <button className="button" onClick={openModal}>Update Profile Image</button>

                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h4>Update Profile Image URL</h4>
                                <input
                                    type="text"
                                    value={imageURL}
                                    onChange={e => setImageURL(e.target.value)}
                                    placeholder={user?.userImage || "Enter image URL"}
                                />
                                <button onClick={handleImageUpdate}>Update Image</button>
                                <button onClick={closeModal} style={{ backgroundColor: 'grey' }}>Cancel</button>
                            </div>
                        </div>
                    )}

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
                    <button className="delete-button" onClick={handleDelete}>Delete Account</button>
                </div>
            )}
        </>
    );
}