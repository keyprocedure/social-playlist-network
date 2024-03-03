export default function Navbar() {

    return <nav className="nav">
        <a href="/" className="site-title">Beat Link</a>

        <div>
        <ul id="navbar">
            <li>
                <a href="/Home">HOME</a>
            </li>
            <li>
                <a href="/About">ABOUT</a>
            </li>
            <li>
                <a href="/Explore">EXPLORE</a>
            </li>
            <li>
                <a href="/Contact">CONTACT</a>
            </li>
            <li>
                <a href="/Login">LOGIN</a>
            </li>
        </ul>
        </div>

    </nav>

}

