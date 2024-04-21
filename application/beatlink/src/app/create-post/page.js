"use client";
import React from 'react';
import Image from "next/image";
import Navbar from "../components/navbar";
import CreatePost from '../components/CreatePost';
import CheckSessionCookie from '../../../helpers/hooks/CheckSessionCookie';

export default function CreatePostPage() {
    const isLoading = CheckSessionCookie();
    return (
        <>
            <Navbar />
            {isLoading ? (
                <div></div>
            ) : (
                <div style={{ margin: "20px", backgroundColor: "rgba(255, 255, 255, 0.75)", padding: "20px" }}>
                    <CreatePost />
                </div>
            )}
        </>
    );

}