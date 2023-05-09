import { Link, useNavigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useSignOut } from "react-auth-kit";
import { Dispatch } from "react";
import { UserAction, UserActions } from "../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import LoginButton from "./LoginButton";
import { useTranslation } from "react-i18next";
import AnimatedDiv from "./AnimatedDiv";
import { AnimatePresence } from "framer-motion";

const Header = () => {
    const theme: Theme = useTypedSelector(state => state.theme.theme)
    const user = useTypedSelector(state => state.user);
    const signOut = useSignOut()
    const { t, i18n } = useTranslation()
    const dispatch: Dispatch<UserActions> = useDispatch()
    const navigate = useNavigate();

    function handleClick() {
        navigate("/login");
    }

    return (
        <>
            <AnimatePresence mode="wait">
                <header>
                    <Link to="/" className="header__logo">
                        <img src={`../src/assets/logo_${theme}.svg`} alt="" />
                    </Link>
                    {
                        user.username
                            ? (
                                <AnimatedDiv key={user.username} className="header__user">
                                    <span className="header__username">{user.username}</span>
                                    <button
                                        className="logout__button"
                                        onClick={() => {
                                            signOut()
                                            dispatch({ type: UserAction.CLEAR_USER })
                                        }}
                                    >
                                        <span className="material-symbols-rounded">
                                            logout
                                        </span>
                                    </button>
                                </AnimatedDiv>
                            )
                            : (
                                <AnimatedDiv>
                                    <LoginButton icon={"arrow_right_alt"} title={t("auth.login")} onClick={handleClick} disabled={false}></LoginButton>
                                </AnimatedDiv>
                            )
                    }
                </header >
            </AnimatePresence>
        </>
    )
}

export default Header