import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import addrecbook from './images/addrecBook.png'
import './explore'
import { Link, useHistory } from 'react-router-dom'
import './addrecipe.css'
import logo from './images/logo.png'

function Addrecipe() {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const [title, settitle] = useState('');
    const [serves, setserves] = useState('');
    const [time, settime] = useState('')
    const [steps, setsteps] = useState('')
    const [ingred, setIngred] = useState('')
    const [foodtype, setfoodtype] = useState('')
    const [cuisine, setcuisine] = useState('')
    const [image, setimage] = useState("");
    const [url, seturl] = useState("")

    useEffect(() => {
        if (url) {
            console.log("ingred=", ingred)
            fetch("/addrecipe", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    serves,
                    time,
                    ingred,
                    foodtype,
                    steps,
                    cuisine_type: cuisine,
                    photo: url
                })
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                })
                .catch(err => {
                    console.log("error ==", err)
                })
        }

    }, [url])

    const postimage = (event) => {
        event.preventDefault()
        console.log("hello world")
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "recipe-builder");
        data.append("cloud_name", "dvpg6kmsv");
        fetch("https://api.cloudinary.com/v1_1/dvpg6kmsv/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                seturl(data.url)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/login')
    }
    return (
        <>
            {
                state ?
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

                        <div className="row myAddrecipeForm" >
                            <div className="col-6" style={{ backgroundColor: "#b8a1ff" }}>
                                <img src={addrecbook} />
                            </div>
                            <div className="col-6" style={{ backgroundColor: "white" }}>
                                <form >
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" onChange={(e) => settitle(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Serves</label>
                                            <input type="text" className="form-control" onChange={(e) => setserves(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col-4">
                                            <label className="form-label">Cuisine Type</label>
                                            <input type="text" onChange={(e) => setcuisine(e.target.value)} className="form-control validate" />

                                        </div>
                                        <div className="input-field col-4">
                                            <label className="form-label">Time</label>
                                            <input type="text" onChange={(e) => settime(e.target.value)} className=" form-control validate" />

                                        </div>
                                        <div className="input-field col-4">
                                            <label className="form-label">Type</label>
                                            <input type="text" onChange={(e) => setfoodtype(e.target.value)} className="form-control validate" />

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <label className="form-label">Ingredients</label>
                                            <textarea className="form-control" onChange={(e) => setIngred(e.target.value)}></textarea>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col-12">
                                            <label className="form-label">Steps</label>
                                            <textarea className="form-control" onChange={(e) => setsteps(e.target.value)}></textarea>

                                        </div>
                                    </div>
                                    <div className="row choosefile">
                                        <label className="form-label">Select images</label>
                                        <input onChange={(e) => setimage(e.target.files[0])} className="form-control" type="file" id="formFile" />
                                    </div>
                                    <div className="row">
                                        <button style={{ width: "50%", margin: "5px 26% 5px 26%" }} onClick={(event) => postimage(event)} className="btn" >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container my-5">
                            <footer className="text-center text-lg-start text-white">
                                <div className="container p-4 pb-0">
                                    <section className="">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                                <h5 className="text-uppercase">About Us</h5>
                                                <p>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                    Molestiae modi cum ipsam ad, illo possimus laborum ut
                                                    reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
                                                    Reiciendis assumenda iusto sapiente inventore animi?
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                                <h5>Useful Links</h5>
                                                <ul style={{ listStyleType: "none" }}>
                                                    <li>Explore Recipes</li>
                                                    <li>Get Cooking Tips</li>
                                                    <li>Recipe of the Day</li>
                                                    <li>Add Recipe</li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                                <div className="row title">
                                                    <h5>Sign up For Our Newsletter</h5>
                                                </div>
                                                <div className="row textbox" style={{ margin: "10px auto", width: "100%" }} >
                                                    <input className="form-control" type="text"></input>
                                                </div>
                                                <div className="row">
                                                    <button style={{ margin: "10px auto", width: "40%" }} className="btn">Sign up</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>


                                    <hr className="mb-4" />
                                    <section className="mb-4 text-center p-3">
                                        <div className="row">
                                            <h5>Follow Us on</h5>
                                        </div>
                                        <div className="row icons">
                                            <div className="col s3" style={{ padding: "0", margin: "0" }}><i className="fab fa-linkedin fa-2x"></i></div>
                                            <div className="col s3" style={{ padding: "0", margin: "0" }}><i className="fab fa-instagram-square fa-2x"></i></div>
                                            <div className="col s3" style={{ padding: "0", margin: "0" }}><i className="fab fa-facebook-square fa-2x"></i></div>
                                            <div className="col s3" style={{ padding: "0", margin: "0" }}><i className="fab fa-twitter-square fa-2x"></i></div>
                                        </div>
                                    </section>

                                </div>
                            </footer>

                        </div>
                    </div>
                    :
                    <h1>Loading</h1>
            }
        </>
    )
}


export default Addrecipe