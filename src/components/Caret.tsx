type CaretProps = {
    leftMargin: number
    topMargin: number
}

const Caret = ((props: CaretProps) => {

    return (
        <span
            id="caret"
            className="caret"
            style={{
                left: props.leftMargin,
                top: props.topMargin,
            }}>
            |
        </span>
    )
})

export default Caret