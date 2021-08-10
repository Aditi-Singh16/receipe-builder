import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import Home from './components/home'
import Login from './components/login'
import Signup from './components/Signup'
import Explore from './components/explore';
import Profile from './components/myprofile';
import UserSearch from './components/search'
import Addrecipe from './components/addrecipe'
import { reducer, initialState } from './reducers/userReducer'



export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  console.log('in routing state=', state)

  useEffect(() => {
    console.log('useEffect in')
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });   //As when user closes the application the state is also destroyed so to give acess to protected data we update the state.
      // history.push('/home');
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/Signup" component={Signup}></Route>
        <Route exact path="/addrecipe" component={Addrecipe}></Route>
        <Route exact path="/explore" component={Explore}></Route>
        <Route exact path="/myprofile" component={Profile}></Route>
        <Route exact path="/usersearch:item" component={UserSearch}></Route>
      </Switch>
    </Router>
  )
}
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
