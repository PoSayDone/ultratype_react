import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg";

const Header = () => {
    return (
        <>
            <header>
                <Link to="/" className="header__logo">
                    <img src={Logo} alt="" />
                </Link>
                <div className="header__user">
                    <span className="header__user-username"></span>
                </div>
            </header>
        </>
    )
}

export default Header