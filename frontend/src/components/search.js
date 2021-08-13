import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useHistory } from 'react-router-dom'
import logo from './images/logo.png'
import { UserContext } from '../App'
import capture from './Capture.png'
import ReactTooltip from 'react-tooltip';
import { Icon } from '@iconify/react';
import womanCookLightSkinTone from '@iconify-icons/noto/woman-cook-light-skin-tone';
import Modal from 'react-modal';
import Login from './login'
import './search.css'
import HTMLFlipBook from 'react-pageflip';
import bookCover from './images/bookCover.png'
import Footer from "./footer";

const RecipePages = (props) => {

    var str1 = []
    var str2 = []


    const getElements = (elem) => {
        var y = elem
        var x = []
        for (var i = props.initial; i < props.count; i++) {
            x.push(y[i])
        }
        console.log('x is', x)
        return x
    }


    return (
        <div>
            < h5 className="page-header" > Steps</h5 >
            <div className="page-content">
                <ol>
                    {
                        str1 = props.props[0].steps.split('\n'),
                        str2 = getElements(str1),
                        str2.map((elem) => {
                            return (
                                <div>
                                    <li>{elem}</li>

                                </div>
                            )
                        })

                    }
                    {
                        console.log('is end?', props.end),
                        props.end ?
                            <><hr></hr><h3>Voila! You are Done!, I hope You like it :)</h3></>

                            :
                            <></>
                    }
                </ol>
            </div>
        </div >

    )




};



function UserSearch() {
    const { state, dispatch } = useContext(UserContext)
    const [allrecipe, setallrecipe] = useState([])
    const [finarr, setfinarr] = useState([])
    const [checkedState, setCheckedState] = useState(new Array(5).fill(false))
    const [comment, setcomment] = useState('')
    const [showbook, setshowbook] = useState(false)
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const history = useHistory()
    const filters = ['Dessert', 'Pizza', 'Pasta', 'Soup', 'Cocktails', 'Milkshakes']
    const [items, setitems] = useState([])
    var str1 = []
    const searchdiv = useRef();
    const [query, setquery] = useState('')

    const [showres, setshowres] = useState(false)




    const customStyles = {
        content: {
            zIndex: 10,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    //Modal.setAppElement('#yourAppElement');

    function openModal() {
        setIsOpen(true);
    }



    function closeModal() {
        setIsOpen(false);
    }
    function closeModalTwo() {
        setshowbook(false);
    }

    useEffect(() => {
        var searchitem = localStorage.getItem('search')
        fetch('/searchrecipe', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setallrecipe(result.searchres)
                var arr = []
                arr = result.searchres
                if (localStorage.getItem('linkSearch') == true) {
                    arr.filter(item => {
                        if (item.title.toLowerCase().includes(searchitem.toLowerCase())) {
                            if (!finarr.includes(item)) {
                                var x = [item]
                                setfinarr(finarr => [...finarr, x])
                            }
                        }
                    })
                } else {
                    arr.filter(item => {
                        console.log('searchitem lowercase', searchitem)
                        if (item.title.toLowerCase().includes(searchitem.toLowerCase()) || item.foodtype.toLowerCase().includes(searchitem.toLowerCase()) || item.cuisine_type.toLowerCase().includes(searchitem.toLowerCase()) || item.Ingredients.toLowerCase().includes(searchitem.toLowerCase())) {
                            if (!finarr.includes(item)) {
                                var x = [item]
                                setfinarr(finarr => [...finarr, x])
                            }
                        }

                        else if (searchitem.indexOf(' ') >= 0) {
                            var subarr = []
                            var splitarr = searchitem.split(' ')
                            console.log('split arr', splitarr)
                            console.log('all recipe', result.searchres)
                            splitarr.forEach(elem => {
                                console.log(item.title.toLowerCase().includes(elem.toLowerCase()) || item.foodtype.toLowerCase().includes(elem.toLowerCase()) || item.cuisine_type.toLowerCase().includes(elem.toLowerCase()) || item.Ingredients.toLowerCase().includes(elem.toLowerCase()))
                                if (item.title.toLowerCase().includes(elem.toLowerCase()) || item.foodtype.toLowerCase().includes(elem.toLowerCase()) || item.cuisine_type.toLowerCase().includes(elem.toLowerCase()) || item.Ingredients.toLowerCase().includes(elem.toLowerCase())) {
                                    console.log('subarr before pushing', subarr)
                                    if (!subarr.includes(item)) {
                                        subarr.push(item)
                                        setfinarr(finarr => [...finarr, subarr])
                                    }
                                }
                            })
                            console.log('subarr', subarr)

                        }
                        for (var i = 0; i < finarr.length; i++) {
                            if (finarr[i].length == 0) {
                                finarr.splice(i, 1)
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })

    }, [])


    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const submitSearch = () => {
        localStorage.setItem("search", query);
        history.push("/usersearch" + query);
    }

    var arr = []

    const linksearch = (searchitem) => {
        localStorage.setItem("search", searchitem);
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

    function applyfilter() {
        var foodtypearr = []
        for (var i = 0; i < finarr.length; i++) {
            foodtypearr.push(finarr[i][0].foodtype)
        }
        console.log(foodtypearr)

        checkedState.filter((item1, index) => {
            if (item1) {
                allrecipe.filter(item => {
                    if (item.foodtype === filters[index]) {
                        if (!foodtypearr.includes(item.foodtype)) {
                            var x1 = []
                            x1.push(item)
                            setfinarr(finarr => [...finarr, x1])
                        }
                    }
                })
            }
        })
    }

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/login')
    }

    const likerecipe = (id) => {
        fetch('/likerecipe', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                recipeId: id
            })
        }).then(res => res.json())
            .then(result => {
                setfinarr(finarr.map(item => {
                    if (item[0]._id === result._id) {
                        var x1 = []
                        x1.push(result)
                        return x1
                    } else {
                        return item
                    }
                })
                )
                localStorage.setItem("itemlist", JSON.stringify(finarr))
            }).catch(err => {
                console.log(err)
            })

    }

    const unlikerecipe = (id) => {
        fetch('/unlikerecipe', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                recipeId: id
            })
        }).then(res => res.json())
            .then(result => {
                setfinarr(finarr.map(item => {
                    console.log(item[0]._id)
                    if (item[0]._id === result._id) {//this means that if id of the post on the page is equal to id of the post we liked then we will update it
                        var x1 = [result]
                        return x1
                    } else {
                        return item
                    }
                })
                )
            }).catch(err => console.log(err))

    }

    const Openrecipe = (item) => {
        setitems(item)
        setshowbook(true)
    }

    const makecomment = (text, id) => {
        console.log(text, id)
        fetch('/commentrecipe', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text,
                recipeId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log('result id', result)
                setfinarr(finarr.map(item => {
                    console.log(item[0]._id)
                    if (item[0]._id === result._id) {//this means that if id of the post on the page is equal to id of the post we liked then we will update it
                        var x1 = [result]
                        return x1
                    } else {
                        return item
                    }
                })
                )
            }).catch(err => console.log(err))
    }

    const getItems = () => {
        console.log('hiiii')
        console.log(document.getElementsByClassName('recipe'))
        for (var i = 0; i < items[0].steps.length; i++) {
            if (items[0].steps.length > 8 * (1 + i)) {
                document.getElementsByClassName('stf__block')[0].appendChild(
                    <div className="demoPage page">
                        <RecipePages props={items} initial={8 * i} count={8 * (1 + i)}></RecipePages>
                    </div>
                )
            }
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
                        <input className="exploreSearch" style={{ border: "none" }} onChange={(e) => handlechange(e)} placeholder="search recipes..." />
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
                <div className="myfilters">
                    <div className="filterNames">
                        {filters.map((name, index) => {
                            return (
                                <div className="d-inline p-1">
                                    <p style={{ backgroundColor: "#CBB2FE" }} className="waves-effect homebtn btn">
                                        <label>
                                            <input className="form-check-input" type="checkbox" checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                                            <span style={{ color: "#3C096C" }}>{name}</span>
                                        </label>
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    <button className="d-block waves-btn homebtn btn" onClick={applyfilter}>Apply</button>

                </div>
                <div className="AllMyRecipe row">
                    {
                        //console.log(finarr),
                        finarr.length !== 0 || query === '' ?
                            finarr.map((item) => {
                                return (
                                    <div className="col-3" style={{ margin: "30px" }}>
                                        <div className="card animaterecipe" style={{ height: "auto", width: "240px" }}>
                                            <div className="card-image">
                                                <img src={item ? item[0].photo : capture} style={{ height: "90%", width: "100%" }} />
                                                <b style={{ marginLeft: "10px" }} className="glow card-title">{item[0].title}</b>
                                                <button onClick={() => { Openrecipe(item) }} data-tip="Let's Cook :),click me to see recipe" className="btn-floating btn letsCook" data-position="bottom" data-tooltip="Lets cook!">
                                                    <Icon icon={womanCookLightSkinTone} height="40px" />
                                                </button>
                                                <ReactTooltip place="top" backgroundColor='#E69A8DFF' effect="float" />
                                            </div>
                                            <div className="card-content" style={{ padding: "10px" }}>
                                                <div className="row">
                                                    <p>Preparation time:<span>{item[0].time}</span></p>
                                                </div>
                                                <div className="row">
                                                    <p>Cuisine type:<span>{item[0].cuisine_type}</span></p>
                                                </div>
                                                <div className="row">
                                                    <p>Serves:<span>{item[0].serves}</span></p>
                                                </div>
                                                <div className="row">
                                                    {
                                                        item[0].likes.includes(state._id) ?
                                                            <button className="col-4 btn" style={{ margin: "0% 3%" }} onClick={() => { unlikerecipe(item[0]._id) }}>
                                                                <i class="fas fa-heart"></i>
                                                                {item[0].likes.length}
                                                            </button>
                                                            :
                                                            <button className="col-4 btn" style={{ margin: "0% 3%" }} onClick={() => { likerecipe(item[0]._id) }}>
                                                                <i class="far fa-heart"></i>
                                                                {item[0].likes.length}
                                                            </button>
                                                    }
                                                    <button className="col-4 btn" style={{ margin: "0% 3%" }} onClick={openModal}>
                                                        <i class="far fa-comment-alt"></i>
                                                        {item[0].comments.length}
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            //onAfterOpen={afterOpenModal}
                                            ariaHideApp={false}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <button className="waves-btn btn homebtn" onClick={closeModal}>close</button>
                                            <h5>Comments</h5>
                                            <div>
                                                {
                                                    console.log('is modal open: ' + items),
                                                    modalIsOpen ?
                                                        item[0].comments.map(rec => {
                                                            return (
                                                                <h6 key={rec._id}><span style={{ fontWeight: 'bold' }}>{rec.postedby['username']}</span>    {rec.text}</h6>
                                                            )
                                                        })
                                                        : <div></div>
                                                }
                                            </div>
                                            <form >
                                                <input className="exploreCommentSearch" type="text" onChange={(e) => { setcomment(e.target.value) }} placeholder="comment here..."></input>
                                                {comment.length == 0 ? <input className="waves-btn btn" disabled onClick={(e) => {
                                                    e.preventDefault();
                                                    makecomment(comment, item[0]._id)
                                                }} type="submit" value="Post" style={{ padding: "0px" }}></input>
                                                    : <input style={{ padding: "0px" }} className="waves-btn btn" onClick={(e) => {
                                                        e.preventDefault();
                                                        makecomment(comment, item[0]._id)
                                                    }} type="submit" value="Post"></input>
                                                }

                                            </form>
                                        </Modal>

                                    </div>

                                )
                            })
                            :
                            <h1>No results found</h1>
                    }

                </div>
                {
                    showbook ?
                        <Modal
                            className="myRecipeModal"
                            style={{ height: "100%" }}
                            isOpen={showbook}
                            //onAfterOpen={afterOpenModal}
                            ariaHideApp={false}
                            onRequestClose={closeModalTwo}
                            contentLabel="Example Modal"
                        >
                            <button className="waves-btn btn homebtn closebtnModal" onClick={closeModalTwo}>close</button>
                            <HTMLFlipBook className="recipe" width={400} height={500}>
                                <div className="demoPage">
                                    <img src={bookCover} style={{ width: "400px", height: "500px" }}></img>
                                </div>
                                <div className="demoPage page recipebookImg">
                                    <img src={items ? items[0].photo : capture} style={{ width: "100%", height: "60%" }} />
                                    <h5 className="page-header">{items[0].title}</h5>
                                </div>
                                <div className="demoPage page">
                                    <h5 className="page-header">Ingredients</h5>
                                    <ul>
                                        {
                                            str1 = items[0].Ingredients.split('\n'),
                                            str1.map((item) => {
                                                return (
                                                    <li>{item}</li>
                                                )
                                            })

                                        }
                                    </ul>

                                </div>
                                {

                                    str1 = items[0].steps.split('\n').length,
                                    console.log('str1 0-8', str1),
                                    str1 > 0 && str1 < 8 || str1 > 8 ?

                                        <div className="demoPage page">
                                            <RecipePages props={items} initial={0} count={str1 > 8 ? 8 : str1} end={str1 > 8 ? false : true}></RecipePages>
                                        </div>

                                        :
                                        <></>
                                }
                                {
                                    str1 = items[0].steps.split('\n').length,
                                    console.log('str1 8-16', str1),
                                    (str1 >= 8 && str1 <= 16) || str1 > 16 ?
                                        <div className="demoPage page">
                                            <RecipePages props={items} initial={8} count={str1 > 16 ? 16 : str1} end={str1 > 16 ? false : true}></RecipePages>
                                        </div>

                                        :
                                        <></>
                                }
                                {
                                    str1 = items[0].steps.split('\n').length,
                                    console.log('str is ', str1),
                                    (str1 > 16 && str1 <= 24) || str1 > 24 ?

                                        <div className="demoPage page">
                                            <RecipePages props={items} initial={16} count={str1 > 24 ? 24 : str1} end={str1 > 24 ? false : true}></RecipePages>
                                        </div>

                                        :
                                        <></>
                                }
                                {
                                    str1 = items[0].steps.split('\n').length,
                                    console.log('str is ', str1),
                                    (str1 >= 24 && str1 <= 32) || str1 > 32 ?

                                        <div className="demoPage page">
                                            <RecipePages props={items} initial={24} count={str1 > 32 ? 32 : str1} end={str1 > 32 ? false : true}></RecipePages>
                                        </div>

                                        :
                                        <></>
                                }


                            </HTMLFlipBook>


                        </Modal>
                        :
                        <></>
                }
                <Footer />


            </div>
        )
    }
}
export default UserSearch

