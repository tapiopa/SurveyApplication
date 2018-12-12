import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from './Drawer';

export class Header extends Component {

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

    return (
      <div>
        <AppBar {...navProps}>
            <Toolbar>
                <div> 
                    Survey App
                </div>
            </Toolbar>

            <Drawer/>
        </AppBar>
      </div>
    )
  }
}

export default Header