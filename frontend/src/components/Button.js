import '../styles/Button.css'

function Button({type, className,onClick, buttonContent   }) {
    return (<button type={type}
        className={className} onClick={onClick}
    >{buttonContent}</button>)
}

export default Button