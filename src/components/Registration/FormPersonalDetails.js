import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import TextDate from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// import RaisedButton from 'material-ui/RaisedButton';

// import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


export class FormPersonalDetails extends Component {
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
          <AppBar title="Enter Personal Details" />

          <FormControl style={styles.InputFirst}>
          <InputLabel htmlFor="adornment-phone">Enter Your Phone</InputLabel>
          <Input
            type='text'
            defaultValue={values.phone}
            onChange={handleChange('phone')}
          />
          </FormControl>
          <br />

          <TextDate
          id="date"
          label="Birthdate"
          type="date"
          onChange={handleChange('birthdate')}
          defaultValue={values.birthdate}
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:256}}
        />
        <br />

          <FormControl style={styles.InputFirst}>
          <InputLabel htmlFor="adornment-streetAddress">Enter Your Street Address</InputLabel>
          <Input
            type='text'
            defaultValue={values.streetAddress}
            onChange={handleChange('streetAddress')}
          />
          </FormControl>
          <br />
          
          <FormControl style={styles.InputLast}>
          <InputLabel htmlFor="adornment-postalCode">Enter Your Postal Code</InputLabel>
          <Input
            type='text'
            defaultValue={values.postalCode}
            onChange={handleChange('postalCode')}
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
    marginTop:25,
    marginBottom:15
  },
  Input:{
    width: 256,
    margin:25
  },
  InputLast:{
    width: 256,
  },
};

export default FormPersonalDetails;