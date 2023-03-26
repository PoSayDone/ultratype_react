import { Link, NavLink } from "react-router-dom"

interface NavbarProps{
    language : boolean
}

interface NavItemProps{
    src: string
    spanText: string
    language: boolean
    innerText: string[] //первый в массиве текст русский, второй английский
}


//отрефракторил немного и вынес ячейки навигации в отдельную компоненту
const NavItem = ({src,spanText,language,innerText} : NavItemProps) =>{
    return(
        <NavLink to={src} className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        {spanText}
                    </span>
                </div>
                <div className="navbar__item_text">
                    {language? innerText[0] : innerText[1]}
                </div>
            </NavLink>
    )
}

const Navbar = ({language} : NavbarProps) => {
    return (
        <nav>
            <NavItem src="/" spanText="home" language={language} innerText={['Главная','Home']}/>
            <NavItem src="/typing" spanText="notes" language={language} innerText={['Печать','Typing']}/>
            <NavItem src="/settings" spanText="settings" language={language} innerText={['Настройки','Settings']}/>
            <NavItem src="/profile" spanText="person" language={language} innerText={['Профиль','Profile']}/>
        </nav>
    )
}

export default Navbar