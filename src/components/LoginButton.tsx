type Props = {
    icon: string
    title: string
    disabled: boolean
    onClick?: Function
}

const LoginButton = (props: Props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <button disabled={props.disabled} type='submit' className="button" onClick={event => handleClick()}>
            {props.title}
            <span className="material-symbols-rounded">
                {props.icon}
            </span>
        </button>
    )
}

export default LoginButton