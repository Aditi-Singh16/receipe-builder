import React from 'react'
import './style.css'

function Footer() {

    return (
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
    )
}

export default Footer