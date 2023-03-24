import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                    home
                    </span>
                </div>
                <div className="navbar__item_text">
                    Главная
                </div>
            </NavLink>
            <NavLink to="/typing" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                    notes
                    </span>
                </div>
                <div className="navbar__item_text">
                    Печать
                </div>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                    settings
                    </span>
                </div>
                <div className="navbar__item_text">
                    Настройки
                </div>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'navbar__item navbar__item_active' : 'navbar__item')}>
                <div className="navbar__item_box">
                    <span className="material-symbols-rounded">
                    person
                    </span>
                </div>
                <div className="navbar__item_text">
                    Профиль
                </div>
            </NavLink>
        </nav>
    )
}

export default Navbar