import React, {Component} from 'react';

import "./Account.css";

class Account extends Component {
    render() {
        let state = {
            id: "garblegarble",
            username: "user1",
            password: "user1",
            joined: "2018-07-07",
            expires: "2019-07-07",
            lastEdited: "2018-11-08",
            Google: "omnomnom",
            Facebook: "",
            Twitter: ""
        };

        return (
            <div>
                <h1>Account</h1>
                <form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={state.username}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                               value={state.password}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                               name="confirmPassword"
                               id="confirmPassword"
                               value=""/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="joined">Joined Date</label>

                        <input disabled="disabled" type="date" name="joined" id="joined"
                               value={state.joined}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="expires">Account Expires</label>
                        <input disabled="disabled" type="date" name="expires"
                               id="expires" value={state.expires}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="lastEdited">Account Last Edited</label>
                        <input disabled="disabled" type="date" name="lastEdited"
                               id="lastEdited"
                               value={state.lastEdited}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Account;
