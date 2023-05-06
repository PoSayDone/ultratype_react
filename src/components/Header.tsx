import { Link } from "react-router-dom"
import { Theme } from "../store/reducers/themeReducer";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Cookies from 'js-cookie';


const Header = () => {
    const theme: Theme = useTypedSelector(state => state.theme.theme)
    const username = Cookies.get("_auth_state");
    
    return (
        <>
            <header>
                <Link to="/" className="header__logo">
                    <img src={`../src/assets/logo_${theme}.svg`} alt="" />
                </Link>
                <div className="header__user">
                    <span className="header__user-username">
                        {
                            username
                                ? username.replaceAll("\"", "")
                                : (<Link to={"/login"}>Войти</Link>)
                        }
                    </span>
                </div>
            </header>
        </>
    )
}

export default Header