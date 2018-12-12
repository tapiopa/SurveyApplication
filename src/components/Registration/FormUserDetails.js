import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter User Details" />
          
          <FormControl style={styles.InputFirst}>
          <InputLabel htmlFor="adornment-firstname">Enter Your First Name</InputLabel>
          <Input
            type='text'
            defaultValue={values.firstname}
            onChange={handleChange('firstname')}
          />
          
          </FormControl>
          <br />
          <FormControl style={styles.Input}>
          <InputLabel htmlFor="adornment-lastname">Enter Your Last Name</InputLabel>
          <Input
            type='text'
            defaultValue={values.lastname}
            onChange={handleChange('lastname')}
          />
          </FormControl>
          <br />
          
          <FormControl style={styles.InputLast}>
          <InputLabel htmlFor="adornment-email">Enter Your Email</InputLabel>
          <Input
            type='text'
            defaultValue={values.email}
            onChange={handleChange('email')}
          />
          </FormControl>
          <br />

          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  },
  InputFirst:{
    width: 256,
    marginTop:25
  },
  Input:{
    width: 256,
    margin:25
  },
  InputLast:{
    width: 256,
  }
};


export default FormUserDetails;