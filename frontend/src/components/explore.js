import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from '../App'
import { Link, useHistory } from 'react-router-dom'
import Login from './login'
import logo from './images/logo.png'
import './explore.css'
import Carousel from 'react-elastic-carousel';
import Footer from "./footer";


function Explore() {
    const { state, dispatch } = useContext(UserContext)
    const searchdiv = useRef();

    const [allrecipe, setallrecipe] = useState([])
    const [toprecipe, settoprecipe] = useState([])
    const [curerecipe, setcurerecipe] = useState([])
    const [showres, setshowres] = useState(false)
    const [query, setquery] = useState('')


    const history = useHistory()

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/login')
    }

    useEffect(() => {
        fetch('/toprecipe', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                settoprecipe(result.toprec)
            }).catch(err => {
                console.log(err)
            })
        fetch('/searchrecipe', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setallrecipe(result.searchres)
            }).catch(err => {
                console.log(err)
            })
        fetch('/curerecipe', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log('cureres=', result.cureres)
                setcurerecipe(result.cureres)
            }).catch(err => {
                console.log('errr=', err)
            })

    }, [])

    const submitSearch = () => {
        localStorage.setItem("search", query);
        history.push("/usersearch" + query);
    }

    var arr = []

    const linksearch = (searchitem) => {
        localStorage.setItem("search", searchitem);
        localStorage.setItem("linkSearch", true);
    }
    const handlechange = (e) => {
        var val = e.target.value
        setquery(val)
        if (val.length == 0) {
            searchdiv.current.style.opacity = "0"
            setshowres(false)
        } else {
            searchdiv.current.style.opacity = "1"
        }
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
                                    <Link to="/viewAll" className="nav-link">All Recipes</Link>
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
                <div className="myform">
                    <form>
                        <input className="exploreSearch" style={{ border: "none", outline: "none" }} onChange={(e) => handlechange(e)} placeholder="search recipes..." />
                        <input onClick={submitSearch} className="gobtn btn" type="submit" value="Go!" />
                        <div id="scrolldesign" style={{ zIndex: "-1", backgroundColor: "#8187DC", width: "350px", height: "auto", opacity: "0", borderRadius: "5px" }} ref={searchdiv}>
                            <ul>
                                {
                                    allrecipe.filter(item => {
                                        if (query == "") {
                                            //do nothing
                                        }
                                        else if (query.indexOf(' ') >= 0) {
                                            var subarr = []
                                            var splitarr = query.split(' ')
                                            splitarr.forEach(elem => {
                                                if (item.title.toLowerCase().includes(elem.toLowerCase()) || item.foodtype.toLowerCase().includes(elem.toLowerCase()) || item.cuisine_type.toLowerCase().includes(elem.toLowerCase()) || item.Ingredients.toLowerCase().includes(elem.toLowerCase())) {
                                                    if (!subarr.includes(item.title)) {
                                                        subarr.push(item.title)
                                                    }
                                                }
                                            })
                                            arr.push(subarr)
                                        }
                                        else if (item.title.toLowerCase().includes(query.toLowerCase()) || item.foodtype.toLowerCase().includes(query.toLowerCase()) || item.cuisine_type.toLowerCase().includes(query.toLowerCase()) || item.Ingredients.toLowerCase().includes(query.toLowerCase())) {
                                            arr.push(item.title)
                                        }
                                        else {
                                            //do nothing  
                                        }
                                    }),
                                    arr.forEach(elem => {
                                        if (elem.length == 0) {
                                            arr.splice(arr.indexOf(elem), 1)
                                        }
                                    }),
                                    arr.map((item) => {
                                        return (
                                            <li style={{ padding: "10px" }}>
                                                <Link to={"/usersearch" + item} style={{ color: "white" }} onClick={() => { linksearch(item) }}>{item}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="Content row">
                    <div className="col-4">
                        <h3 style={{ margin: "5%" }}>Check out the tasty way to <span style={{ color: "#5555ec" }}>Prevent diseases!!</span></h3>
                        <div className="curedis">
                            {
                                curerecipe.map(item => {
                                    return (
                                        <div className="cureresdiv">
                                            <h5 style={{ paddingLeft: "10px" }}>Recipe to prevent {item.disease}</h5>
                                            <div className="row cureres">
                                                <p style={{ marginLeft: "18px" }}>{item.title}</p>
                                                <div className="col s6">
                                                    <p>Total time<i class="far fa-clock"></i>:{item.time}</p>
                                                </div>
                                                <div className="col s6">
                                                    <p>Serves:<i class="fas fa-utensils"></i><span>{item.serves}</span></p>
                                                </div>
                                            </div>
                                            <div className="row" style={{ backgroundColor: "#8187DC", margin: "1px" }}>
                                                <div>
                                                    <p style={{ color: "#240046", fontWeight: "bold" }}>Likes: <span>{item.likes.length}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-8">

                        <div className="SearchRes">
                            <h2 style={{ marginLeft: "27%" }}>Top Recipes<span style={{ color: "#5555ec" }}> Of the day</span></h2>
                            <Carousel>
                                {
                                    toprecipe.map((item) => (
                                        <div className="row myCarousel" style={{ backgroundColor: "#E6CFFD", borderRadius: "15px", boxShadow: "5px 5px 10px 2px #240046", width: "90%", margin: "20px auto", padding: "0px" }}>
                                            <div className="col-8" style={{ padding: "0" }}>
                                                <img src={item.photo} style={{ width: "410px", height: "310px", borderRadius: "15px" }}></img>
                                            </div>
                                            <div className="col-4" style={{ height: "100%", paddingRight: "0" }}>
                                                <h3 style={{ paddingLeft: "6px", marginTop: "5%" }}>{item.title}</h3>
                                                <div className="myrecipeinfo" style={{ display: "block", marginTop: "15%" }}>
                                                    <h6>Preparation time:<span>{item.time}</span></h6>
                                                    <h6>Cuisine type:<span>{item.cuisine_type}</span></h6>
                                                    <h6>Serves:<span>{item.serves}</span></h6>
                                                    <h6>Posted by: <span>{item.usersnamee[0].username}</span></h6>
                                                </div>
                                                <div className="Mylikes row" style={{ marginTop: "30%", backgroundColor: "#8187DC", borderBottomRightRadius: "15px", borderBottomLeftRadius: "15px", marginBottom: "0%", marginRight: "0px" }}>

                                                    <p style={{ color: "#240046", fontWeight: "bold" }}>Likes: <span>{item.likes}</span></p>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        )
    }

}

export default Explore
