"use client";
import "../../../public/css/about.css";
import checkSessionCookie from '../../../helpers/hooks/checkSessionCookie';

export default function About() {
    const isLoading = checkSessionCookie();

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div>
            <div className="title">
                <h1>Milestone 0</h1>
                <h2>CSC-648 01 Software Engineering</h2>
                <h3>Team 03</h3>
            </div>
            <div className="container">
                <a href="about/anthony">
                    <button>Anthony B.</button>
                </a>
                <a href="about/warisha">
                    <button>Warisha V.</button>
                </a>
                <a href="about/anna">
                    <button>Anna F.</button>
                </a>
                <a href="about/guillermo">
                    <button>Guillermo A.</button>
                </a>
                <a href="about/zuby">
                    <button>Zuby A.</button>
                </a>
                <a href="about/yash">
                    <button>Yash B.</button>
                </a>
            </div>
        </div>
    );
}
