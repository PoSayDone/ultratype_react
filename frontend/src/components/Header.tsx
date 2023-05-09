import {Link} from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useSignOut} from "react-auth-kit";
import {Dispatch} from "react";
import {UserAction, UserActions} from "../store/reducers/userReducer";
import {useDispatch} from "react-redux";

const Header = () => {
    const theme: Theme = useTypedSelector(state => state.theme.theme)
    const user = useTypedSelector(state => state.user);
    const signOut = useSignOut()
    const dispatch : Dispatch<UserActions> = useDispatch()
    return (
        <>
            <header>
                <Link to="/" className="header__logo">
                    <img src={`../src/assets/logo_${theme}.svg`} alt="" />
                </Link>
                <div className="header__user">
                    <span className="header__user-username">
                        {
                            user.username
                                ? (<>{user.username} <br/> <button className="button" onClick={() => {signOut()
                                dispatch({type: UserAction.CLEAR_USER})
                                }
                                }>Выйти</button> </>)
                                : (<button className="button" ><Link to={"/login"}>Войти</Link></button>)
                        }
                    </span>
                </div>
            </header>
        </>
    )
}

export default Header