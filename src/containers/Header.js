import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from './Drawer';
import MaterialIcon from 'react-google-material-icons';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from 'react-router-dom';
import AuthHandler from '../components/Login/AuthHandler';

export class Header extends Component {
    AuthHandler = new AuthHandler();
    constructor(props){
        super(props);
        this.state={
            isLoggedin: this.props.isLogged,
            anchorEl: null
        }
    }

    showDropdown = (e) => {
        e.preventDefault();
        this.setState({anchorEl : e.currentTarget});
      }
    closeDropdown = () =>{
        this.setState({anchorEl : null});
    }
    _handleLogout = () => {
        console.log("App, handleLogout");
        this.AuthHandler.logout();
        this.props.onLogoutUser();
        this.props.history.replace('/login');
    };

  render() {
    const navProps = {
        position:"fixed", 
        style:{
            backgroundColor: '#384048',
            color:'#FFF',
            fontWeight: 700,
            marginRight: 'auto',
            flexDirection: 'row',
            height: '4rem',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)' 
        }
    }  
    const { anchorEl } = this.state;
    return (
      <div>
        <AppBar {...navProps}>
            <Toolbar>
                <div> 
                    Survey App
                </div>
            </Toolbar>
            <Drawer/>
            <div>
          {!this.props.isLogged ? null :  <div><p>Hello {/* this.props.app.firstname */}! {'   '}
          <Button
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.showDropdown}
            >
                <MaterialIcon icon="list" size={20}/>
          </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeDropdown}
          className="dropMenu"
        >
          <MenuItem onClick={this.closeDropdown}><NavLink to="/user">Profile</NavLink></MenuItem>
          <MenuItem onClick={this.closeDropdown}><NavLink to="/account">My account</NavLink></MenuItem>
          <MenuItem onClick={this.closeDropdown}>
                <button
                  className="btn-sm btn-warning"
                  onClick={this._handleLogout}>
                  Logout
                </button>
          </MenuItem>
        </Menu>
          </p></div>}

        </div>
        </AppBar>
      </div>
    )
  }
}

export default Header