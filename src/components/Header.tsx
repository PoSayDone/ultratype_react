import { Link } from "react-router-dom"
import { ThemeContext, themes } from "../contexts/ThemeContext";

const Header = () => {
    return (
        <>
            <header>
                <Link to="/" className="header__logo">
                    <ThemeContext.Consumer>
                        {({theme}) => (
                            <img src={`../src/assets/logo_${theme}.svg`} alt="" />
                        )}
                    </ThemeContext.Consumer>
                </Link>
                <div className="header__user">
                    <span className="header__user-username"></span>
                </div>
                <ThemeContext.Consumer>
                    {({ theme, setTheme }) => (
                        <i onClick={() => {
                            if (theme === themes.light) setTheme(themes.dark)
                            if (theme === themes.dark) setTheme(themes.light)
                        }} className="material-symbols-rounded">Home</i>
                    )}
                </ThemeContext.Consumer>
            </header>
        </>
    )
}

export default Header