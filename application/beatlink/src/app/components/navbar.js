export default function Navbar() {

    return <nav className="nav">
        <a href="/" className="site-title">Beat Link</a>

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

