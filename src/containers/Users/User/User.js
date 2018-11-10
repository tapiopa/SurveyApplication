import React, {Component} from 'react';

class User extends Component {
    state = {
        id: "garblegarble",
        firstname: "Tapio",
        lastname: "Paloniemi",
        email: "tapiopa@gmail.com",
        dateofbirth: "1964-12-26",
        phone: "050-3595394",
        streetAddress: "Kalakatu 6",
        postalCode: "90230 Oulu",
        rewards: "12",
        lastEdited: "2018-11-08"
    };

    handleDataChange = (event) => {
        this.setState({firstname: event.target.value});
        console.log(`state  name: ${this.state.firstname}`);
        console.log(`event target name: ${event.target.name}`);
        console.log(`event target value: ${event.target.value}`);
    };




    render() {

        return (
            <div>
                <h1>Personal Data</h1>
                <form>
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" id="firstname"
                               onChange={this.handleDataChange} defaultValue={this.state.firstname}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" id="lastname"
                               defaultValue={this.state.lastname}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="confirmPassword"
                               defaultValue={this.state.email}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="dateofbirth">Date of Birth</label>
                        <input type="date" name="dateofbirth"
                               id="dateofbirth"
                               defaultValue={this.state.dateofbirth}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone"
                               defaultValue={this.state.phone}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="streetAddress">Street Address</label>
                        <input type="text" name="streetAddress"
                               id="streetAddress"
                               defaultValue={this.state.streetAddress}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>

                        <input type="text" name="postalCode"
                               id="postalCode"
                               defaultValue={this.state.postalCode}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="rewards">Rewards</label>
                        <input readOnly={true} type="number"
                               name="rewards" id="rewards"
                               value={this.state.rewards}/>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor="lastEdited">Account Last Edited</label>
                        <input readOnly={true}
                               type="date" name="lastEdited"
                               id="lastEdited"
                               value={this.state.lastEdited}/>
                    </div>
                </form>
            </div>
    );
    }
    }

    export default User;