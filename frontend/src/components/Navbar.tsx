import { TFunction } from "i18next"
import { Link, NavLink } from "react-router-dom"

interface NavbarProps{
    language : TFunction<"translation" , undefined , "translation">
}

interface NavItemProps{
    src: string
    spanText: string
    innerText: string //первый в массиве текст русский, второй английский
}


//отрефракторил немного и вынес ячейки навигации в отдельную компоненту
const NavItem = ({src,spanText,innerText} : NavItemProps) =>{
    return(
        <NavLink to={src} className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        {spanText}
                    </span>
                </div>
                <div className="navbar__item_text">
                    {innerText}
                </div>
            </NavLink>
    )
}

const Navbar = ({language} : NavbarProps) => {
    return (
        <nav>
            <NavItem src="/" spanText="home"  innerText={language("navbar.home")}/>
            <NavItem src="/typing" spanText="notes"  innerText={language("navbar.typing")}/>
            <NavItem src="/settings" spanText="settings"  innerText={language("navbar.settings")}/>
            <NavItem src="/profile" spanText="person"  innerText={language("navbar.profile")}/>
        </nav>
    )
}

export default Navbar