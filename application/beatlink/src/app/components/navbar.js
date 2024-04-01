import Image from "next/image"

export default function Navbar() {

    return <nav className="nav">
        <a href="/" className="site-title">
            <Image src="images/logo.png.png" alt="Site Logo" className="site-logo" style={{ width: "100px", height: "auto" }} /></a>

        <div>
            <ul id="navbar">
                <li>
                    <a href="/">HOME</a>
                </li>
                <li>
                    <a href="/about">ABOUT</a>
                </li>
                <li>
                    <a href="/explore">EXPLORE</a>
                </li>
                <li>
                    <a href="/contact">CONTACT</a>
                </li>
                <li>
                    <a href="/login">LOGIN</a>
                </li>
            </ul>
        </div>

    </nav>

}

