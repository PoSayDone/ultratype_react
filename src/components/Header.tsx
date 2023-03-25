import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg";

const Header = () => {
    return (
        <>
            <header>
                <div className="header__logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="header__user">
                    <span className="header__user-username"></span>
                </div>
            </header>
        </>
    )
}

export default Header