import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css"
import Signup from './Signup';

function Login() {

    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');


    const loginuser = (event) => {
        event.preventDefault();
        fetch('/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("jwt", result.token);
                    dispatch({ type: "USER", payload: result.user })

                    history.push('/explore')
                    toast.success('Welcome back!! <3', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } else if (result.error) {
                    toast.error(result.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }


    return (
        <>
            <h2 className="SignupHeading">Sign up to Digital CookBook</h2>
            <div className="form-container img-fluid" >
                <form>
                    <div>
                        <input type="text" className="form-control" placeholder="username" value={username} onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <br></br>
                    <div>
                        <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <button onClick={loginuser} className="form-btn btn waves-effect" >Login</button>
                    <div>
                        <p>Don't Have an account? <span><Link to="/Signup">Signup</Link></span></p>
                    </div>
                </form>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
        </>
    )
}

export default Login