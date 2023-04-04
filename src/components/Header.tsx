import { Link } from "react-router-dom"
import { Theme } from "../store/reducers/themeReducer";
import { useTypedSelector } from "../hooks/useTypedSelector";


const Header = () => {
    const theme : Theme = useTypedSelector(state => state.theme.theme)

    return (
        <>
            <header>
                <Link to="/" className="header__logo">
                    <img src={`../src/assets/logo_${theme}.svg`} alt="" />
                </Link>
                <div className="header__user">
                    <span className="header__user-username"></span>
                </div>
            </header>
        </>
    )
}

export default Header