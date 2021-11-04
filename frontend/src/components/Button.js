import '../styles/Button.css'

function Button({ buttonContent, className, bgc }) {
    return (<button
        className={className}
    >{buttonContent}</button>)
}

export default Button