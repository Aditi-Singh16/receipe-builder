import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import bxBookHeart from '@iconify-icons/bx/bx-book-heart';
import chatIcon from '@iconify-icons/et/chat';
import handPointRight from '@iconify-icons/fa-regular/hand-point-right';
import chef from './images/chef.png'
import food1 from './images/2.png'
import food2 from './images/3.png'
import food3 from './images/4.png'
import food4 from './images/5.png'
import food5 from './images/6.png'
import food6 from './images/7.png'
import food7 from './images/8.png'
import food8 from './images/9.png'
import chef2 from './images/chef2.png'
import logo from './images/logo.png'
import bg from './images/bg2.png'
import bgLower from './images/bg2Lower.png'

import './style.css'

function Home() {


    return (
        <div className="Outer">
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src={logo} alt="mylogo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/explore" className="nav-link">Explore your favorite recipes...</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link" to="/Signup">Signup</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/#"><Icon icon={chatIcon} style={{ fontSize: '36px' }} /></Link>

                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5A189A" fillOpacity="1" d="M0,160L24,144C48,128,96,96,144,112C192,128,240,192,288,202.7C336,213,384,171,432,144C480,117,528,107,576,117.3C624,128,672,160,720,192C768,224,816,256,864,234.7C912,213,960,139,1008,133.3C1056,128,1104,192,1152,213.3C1200,235,1248,213,1296,213.3C1344,213,1392,235,1416,245.3L1440,256L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
            <div className="heading">
                <h1 className="animate__animated animate__bounceInDown">Your  Digital  Cookbook</h1>
            </div>
            <div className="mystyle animate__animated animate__rotateInDownLeft">
                <img alt="myFood" src={chef} className="img-fluid"></img>
            </div>
            <div className="mychef animate__animated animate__rotateInDownLeft">
                <img alt="myFood" src={chef2} className="img-fluid"></img>
            </div>
            <div className="mainbg">
                <img alt="myFood" src={bg} className="img-fluid"></img>
            </div>
            <div className="rotation">
                <div className="slider">
                    <span style={{ '--i': 2 }}><img alt="myFood" className="img-fluid" src={food1} /></span>
                    <span style={{ '--i': 3 }}><img alt="myFood" className="img-fluid" src={food2} /></span>
                    <span style={{ '--i': 4 }}><img alt="myFood" className="img-fluid" src={food3} /></span>
                    <span style={{ '--i': 5 }}><img alt="myFood" className="img-fluid" src={food4} /></span>
                    <span style={{ '--i': 6 }}><img alt="myFood" className="img-fluid" src={food5} /></span>
                    <span style={{ '--i': 7 }}><img alt="myFood" className="img-fluid" src={food6} /></span>
                    <span style={{ '--i': 8 }}><img alt="myFood" className="img-fluid" src={food7} /></span>
                    <span style={{ '--i': 9 }}><img alt="myFood" className="img-fluid" src={food8} /></span>
                </div>
            </div>
            <div className="mainbgLower">
                <img alt="myFood" src={bgLower}></img>
            </div>
            <div className="row infoHome">
                <div className="col-6 mylist">
                    <h3 style={{ color: "#3940EE" }}>Your Digital CookBook<Icon icon={bxBookHeart} style={{ color: "white" }} /></h3>
                    <ul>
                        <li style={{ color: "#3940EE" }}><p><Icon icon={handPointRight} />Search Your Favourite Recipes</p></li>
                        <li style={{ color: "#3940EE" }}><p><Icon icon={handPointRight} />Add recipes that you love</p></li>
                        <li style={{ color: "#3940EE" }}><p><Icon icon={handPointRight} />Add some bliss on your plate</p></li>
                    </ul>
                </div>

                <div className="col-6 para">
                    <p style={{ color: "#3940EE" }}>
                        A place Where books and people meet <br />Cook receipes from your favorite chefs,Contribute to our book by adding delicious recipies,and Bake this world a better place!!
                        We can't buy happiness,but hey you can cook these receipes and thats the same thing. Join Us and begin your journey toward cooking smartly!!.
                    </p>
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
    )

}
export default Home