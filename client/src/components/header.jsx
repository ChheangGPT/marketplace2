import { Link } from "react-router-dom";

function Header({ className = "" }) {
    return (
        <header>
            <Link to="/"><h1 className={`text-logo text-3xl sm:text-4xl font-extrabold ${className} `}>
                Marketplace</h1></Link>
        </header>
    )
}
export default Header;