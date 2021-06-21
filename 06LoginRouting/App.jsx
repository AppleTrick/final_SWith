import React, {useState} from "react";
import { Link, Route, Switch, HashRouter as Router } from "react-router-dom";

import Home from "./src/Home";
import About from "./src/About";
import Users from "./src/Users";
import Profile from "./src/Profile";
import AuthRoute from "./AuthRoute";

import NotFound from "./src/NotFound";

import { signIn } from './auth';

const App = () => {

    const [user, setUser] = useState(null); // 초기값 설정안함
    const authenticated = user != null; // user가 존재하면 true 존재하지 않으면 false

    const login = ({email, password}) => setUser(signIn({email, password}));

    const logout = () => setUser(null);

    return(
        <>
            <Router>
                <header>
                    <Link to = "/" >
                        <button>Home</button>
                    </Link>
                    <Link to = "/about">
                        <button>About</button>
                    </Link>
                    <Link to = "/users">
                        <button>Users</button>
                    </Link>
                    <Link to = "/profile">
                        <button>Profile</button>
                    </Link>
                </header>
                <hr/>
                <main>
                    {/* Switch를 통해 정확하게 보내서 갈길수 있다. */}
                    <Switch>
                        <AuthRoute authenticated={authenticated} path="/profile" render = {props => <Profile user= {user} {...props}/> }/>
                        <Route exact path ="/" component={Home}/>
                        <Route path ="/about" component={About}/>
                        <Route path ="/users" component={Users}/>
                        <Route path ="/profile" component={Profile}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
            </Router>
        </>
    );
}
export default App