import { Link, NavLink } from "react-router-dom"

interface NavbarProps{
    language : boolean
}

const Navbar = ({language} : NavbarProps) => {
    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        home
                    </span>
                </div>
                <div className="navbar__item_text">
                    {language? 'Главная' : 'Home'}
                </div>
            </NavLink>
            <NavLink to="/typing" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        notes
                    </span>
                </div>
                <div className="navbar__item_text">
                    {language? 'Печать': 'Typing'}
                </div>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        settings
                    </span>
                </div>
                <div className="navbar__item_text">
                    {language? 'Настройки': 'Settings'}
                </div>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                        person
                    </span>
                </div>
                <div className="navbar__item_text">
                    {language? 'Профиль': 'Profile'}
                </div>
            </NavLink>
        </nav>
    )
}

export default Navbar