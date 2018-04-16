import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Search = ({ onChange }) => (
  <MuiThemeProvider>
	  <TextField
	    fullWidth
	    onChange={onChange}
	    hintText="Search pokemon name..."
	  />
  </MuiThemeProvider>
)

export default Search