import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export class Navbar extends Component {
  render() {
    return (
      <AppBar style={styles.Navbar} position="static">
      <Toolbar>
        <IconButton  color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" >
          Survey App
        </Typography>
      </Toolbar>
    </AppBar>

    )
  }
}

const styles = {
    Navbar: {
      backgroundColor: '#2196f3'
    }
}

export default Navbar
