import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import Login from './login'
import './myprofile.css'
import logo from './images/logo.png'
import Footer from './footer'

function Profile() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const [pic, updatepic] = useState()
    const [myrecipes, setmyrecipe] = useState([])

    useEffect(() => {
        fetch('/getrecipes', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                if (result.message) {
                    console.log(result.message)
                }
                else {
                    setmyrecipe(result.myrecipe)
                }


            })
    }, [])

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/login')
    }

    if (!state) {
        return (
            <div>
                <h3 style={{ margin: "2% 37%", color: "blueviolet" }}>Login to Continue...</h3>
                <Login />
            </div>
        )
    } else {
        return (
            <div>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand"><img src={logo} alt="mylogo" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addrecipe">
                                        <i className="fas fa-plus-circle"></i>
                                        Add recipe
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myprofile">My profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myprofile">Hello {state.username}</Link>
                                </li>
                                <li className="nav-item ">
                                    <button type="button" className="btn" onClick={logout}>logout</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5A189A" fillOpacity="1" d="M0,160L24,144C48,128,96,96,144,112C192,128,240,192,288,202.7C336,213,384,171,432,144C480,117,528,107,576,117.3C624,128,672,160,720,192C768,224,816,256,864,234.7C912,213,960,139,1008,133.3C1056,128,1104,192,1152,213.3C1200,235,1248,213,1296,213.3C1344,213,1392,235,1416,245.3L1440,256L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
                <div className="d-flex justify-content-center Pic">
                    <div className="profile">
                        <img name="profilePic" src={state ? state.profilePic : "https://res.cloudinary.com/dvpg6kmsv/image/upload/v1621075442/eyswoywnlgcxye9kkfac.png"} />
                        <input style={{ width: "50%", margin: "10px" }} onChange={(e) => updatepic(e.target.files[0])} className="form-control" type="file" id="formFile" />
                    </div>
                    <div>
                        <h3>{state.username}</h3>
                        <h5>Recipes: </h5>
                        <h5>Likes: </h5>
                    </div>
                </div>
                <div className="PostedRecipe">
                    <h2 style={{ color: "#240046", margin: "5% 34%" }}>My Recipes</h2>
                    <div className="row myrecipes">
                        {
                            myrecipes.map((item) => (
                                <div className="col-4">
                                    <div className="card">
                                        <h5 className="card-title" >{item.title}</h5>
                                        <div className="row">
                                            <div className="col-4">
                                                <p>Preparation time:<span>{item.time}</span></p>
                                            </div>
                                            <div className="col-4">
                                                <p>Cuisine type:<span>{item.cuisine_type}</span></p>
                                            </div>
                                            <div className="col-4">
                                                <p>Serves:<span>{item.serves}</span></p>
                                            </div>
                                        </div>
                                        <div className="row mylikes" >
                                            <div className="col-6">
                                                <p style={{ color: "#240046", fontWeight: "bold" }}>Likes: <span>{item.likes.length}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Footer />


            </div>
        )
    }
}

export default Profile