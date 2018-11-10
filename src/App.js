import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';

import './App.css';

import Account from "./containers/Accounts/Account/Account";
import User from "./containers/Users/User/User";

class App extends Component {
    state = {
        user_id: "1",
        user_name: "Tapio"
    };

    render() {


        return (
            <div className="App">
                <header>
                    <p>{this.state.user_name}</p>
                </header>
                <nav>
                    <ul>
                        {/*<NavLink to="/" exact className="link">Home</NavLink><br/>*/}
                        <NavLink to="/account" className="link">Account</NavLink><br/>
                        <NavLink to="/user" className="link">Personal Data</NavLink>

                    </ul>
                </nav>

                <Route path="/account" component={Account}/>
                <Route path="/user" component={User}/>
                {/*<Route path="/" exact component={App}/>*/}
            </div>
        );
    }
}

export default App;
