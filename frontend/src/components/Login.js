import Button from './Button'
import '../styles/Login.css'

function Login() {

    function loginUser(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value
        console.log(email, password);
    }

    function registerUser(e) {
        e.preventDefault();
        // const email = document.getElementById('register-email').value
        // const firstName = document.getElementById('register-fist-name').value
        // const secondName = document.getElementById('register-second-name').value
        // const password = document.getElementById('register-password').value
        // const rePassword = document.getElementById('register-repeat-password').value
        // password === rePassword ? console.log('Correct password') : console.log('Wrong password');

    }

    return (
        <div className="login-wrapper">
            <div className="forms">
                <div className="login">
                    <h2>Login</h2>
                    <form action="submit" className="login-form">
                        <label htmlFor="login-email">Email:</label>
                        <input type="text" id="login-email" placeholder="example@email.com" name="login-email" required />

                        <label htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" placeholder="•••••••••••" name="login-password" required />
                        <Button type='submit' onClick={loginUser} className='login' buttonContent='Login' />
                    </form>
                </div>
                <div className="register">
                    <h2>Register</h2>
                    <form action="submit" className="register-form">
                        <label htmlFor="register-email">Email: </label>
                        <input type="text" id="register-email" placeholder="example@email.com" name="register-email" required />

                        <label htmlFor="register-fist-name">Fist Name:</label>
                        <input type="text" id="register-fist-name" placeholder="John" name="register-fist-name" required />

                        <label htmlFor="register-second-name">Second Name: </label>
                        <input type="text" id="register-second-name" placeholder="Doe" name="register-second-name" required />

                        <label htmlFor="register-password">Password: </label>
                        <input type="password" id="register-password" placeholder="•••••••••••" name="register-password" required />

                        <label htmlFor="register-repeat-password">Repeat Password: </label>
                        <input type="password" id="register-repeat-password" placeholder="•••••••••••" name="register-repeat-password" required />

                        <Button type='submit' onClick={registerUser} className='login' buttonContent='Register' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login