import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Login from './login';
import "./login.css"

function Signup() {

    const history = useHistory();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [emailError, setEmailError] = useState('')

    const signupuser = (event) => {
        event.preventDefault();
        fetch('/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                fullname,
                email
            })

        }).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.message) {

                    history.push('/');
                }
                else {

                }
            })
    }

    const validateEmail = (e) => {
        setemail(e.target.value)
        var validator = require("email-validator");
        if (validator.validate(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    return (
        <>
            <h2 className="SignupHeading">Sign up to Digital CookBook</h2>
            <div className="form-container img-fluid">
                <form>
                    <div className="form-group" >
                        <input className="form-control" type="text" placeholder="fullname" value={fullname} onChange={(e) => { setfullname(e.target.value) }} />
                    </div><br></br>
                    <div>
                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { validateEmail(e) }} />
                        <span style={{ fontWeight: 'bold', color: 'red', }}>{emailError}</span>
                    </div>

                    <br></br>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="username" value={username} onChange={(e) => { setusername(e.target.value) }} />
                    </div><br></br>
                    <div>
                        <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <button style={{ marginTop: "30%" }} onClick={signupuser} className="form-btn btn waves-effect" >Sign up</button>
                    <div>
                        <p>Already Have an account?<span><Link to="/login">{Login}</Link></span></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup