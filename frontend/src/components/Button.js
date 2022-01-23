import '../styles/Button.css'

function Button({ type, className, onClick, buttonContent, id }) {
    return (<button id={id} type={type}
        className={className} onClick={onClick}
    >{buttonContent}</button>)
}

export default Button