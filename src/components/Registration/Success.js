import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import HomePage from "../HomePage/HomePage";
// import Login from "../Login/Login";
import {asyncSetUserAccountFK, setAppUserAccountIdName} from "../../store/actions"
import connect from "react-redux/es/connect/connect";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-survey";
import AuthHandler from "../Login/AuthHandler";

export class FormUserDetails extends Component {

    autHandler = new AuthHandler();

    constructor(props) {
        super(props);
        this.setAccountFK = this.setAccountFK.bind(this);

    }


    setAccountFK (user, account) {
        console.log("setAccountFK, user", this.props.user, "account", this.props.account);
        this.props.onSetUserAccountFK(user, account.id);
        this.autHandler.login(account.account, account.password);
        this.props.onSetApp(account, user);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps, nextProps", nextProps);
        console.log("!!!!!Success componentWillReceiveProps, logged in", nextProps.app.loggedIn);
        if (nextProps.user && nextProps.user.saveSuccess &&
            nextProps.account && nextProps.account.saveSuccess &&
            nextProps.app && !nextProps.app.loggedIn) {
            console.log("Surcces, component will rescueve props", nextProps);
            this.setAccountFK(nextProps.user, nextProps.account);
        }
    }

    render() {
    return (

      <MuiThemeProvider>

          <React.Fragment>
            {/*<Redirect to={HomePage}/>*/}
              {!this.props.app.loggedIn ? null :
                  <Redirect to="/home"/>
                  // < h1 > Please, log in next</h1>
              }
          {/*<h1>Thanks You For Your Submission</h1>*/}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user,
        account: state.account
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUserAccountFK: (user, account_id) => dispatch(asyncSetUserAccountFK(user, account_id)),
        onSetApp: (account, user) => dispatch(setAppUserAccountIdName(account, user))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FormUserDetails, axios));
